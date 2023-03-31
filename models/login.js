const loginSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      pattern: '^[a-zA-Z\\d]{6,16}$',
    },
    password: {
      type: 'string',
      pattern: '^[\\da-zA-Z!@#$%?&*]{8,26}$',
    },
  },
  required: ['username', 'password'],
};

export default loginSchema;
