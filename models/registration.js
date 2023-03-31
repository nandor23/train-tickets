const registrationSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      pattern: '^[a-zA-Z\\d]{6,16}$',
    },
    password: {
      type: 'string',
      pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?&*])([\\da-zA-Z!@#$%?&*]{8,26})$',
    },
    passwordAgain: {
      type: 'string',
      pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%?&*])([\\da-zA-Z!@#$%?&*]{8,26})$',
    },
  },
  required: ['username', 'password', 'passwordAgain'],
};

export default registrationSchema;
