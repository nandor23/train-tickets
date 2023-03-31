const routeSchema = {
  type: 'object',
  properties: {
    routeId: {
      type: 'string',
      pattern: '^[\\w-]{6}$',
    },
    startingPoint: {
      type: 'string',
      minLength: 1,
    },
    destination: {
      type: 'string',
      minLength: 1,
    },
    departureDay: {
      type: 'string',
      pattern: '^(Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day$',
    },
    departureTime: {
      type: 'string',
      pattern: '^([01][0-9]|2[0-3]):[0-5][0-9]$',
    },
    arrivalTime: {
      type: 'string',
      pattern: '^([01][0-9]|2[0-3]):[0-5][0-9]$',
    },
    ticketPrice: {
      type: 'number',
      minimum: 1,
    },
    trainType: {
      type: 'string',
      pattern: '^(Passenger|Regional|High-Speed|Inter-City)$',
    },
  },
  required: ['routeId', 'startingPoint', 'destination', 'departureDay',
    'departureTime', 'arrivalTime', 'ticketPrice', 'trainType'],
};

export default routeSchema;
