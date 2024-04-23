import { GraphQLScalarType } from 'graphql';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value: any) {
    return new Date(value);
  },
  serialize(value: any) {
    return value.toString();
  },
})

export default dateScalar;