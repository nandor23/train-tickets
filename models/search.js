const searchSchema = {
  type: 'object',
  properties: {
    startingPoint: {
      type: 'string',
      nullable: true,
    },
    destination: {
      type: 'string',
      nullable: true,
    },
    minPrice: {
      type: 'number',
      minimum: 0,
      nullable: true,
    },
    maxPrice: {
      type: 'number',
      minimum: 0,
      nullable: true,
    },
  },
};

export default searchSchema;
