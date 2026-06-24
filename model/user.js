const { createHmac , randomBytes} = require('node:crypto');
const {Schema,model} = require('mongoose');



const userSchema = new Schema({

  fullName: {
     type: String,
     required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },

  password:{
    type: String,
    required: true
  },

  salt:{
    type: String,
    required: true
  },

  profileImageURL:{
    type: String,
  default:'/images/default-profile.png',
  },

  role:{
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'user'
  }

 }, {timestamps: true});

 userSchema.pre('save', function(next) {
const user = this;

  if (!this.isModified('password')) {   // If the password field is not modified, skip hashing
    return next();  }

    const salt = randomBytes(16).toString();  // Generate a random salt
    const hashPassword = createHmac('sha256', salt)
              .update(user.password)
              .digest('hex');  // Hash the password using HMAC with the generated salt

              this.salt= salt;
              this.password = hashPassword;  // Store the hashed password
              next();

  });


 const User = model('User', userSchema);

module.exports = User;