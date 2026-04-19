import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  resetPasswordToken: {
    type: String,
    select: false
  },
  resetPasswordExpire: {
    type: Date,
    select: false
  },
  avatar: {
    type: String,
    required: false,
    // add gravatar as default avatar 
    default : "https://www.gravatar.com/avatar/00000000000000000000?d=mp"
    },
  },
);


userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    if (ret._id) {
      ret._id = ret._id.toString();
    }
    return ret;
  }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw error;
  }
});

const User = mongoose.model('User', userSchema);

export default User
