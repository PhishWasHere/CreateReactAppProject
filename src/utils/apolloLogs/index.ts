const logs = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext: any) {
    console.log('\x1b[33mRequest started! Query:\n \x1b[0m' + requestContext.request.query);
  

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext: any) {
        console.log('\x1b[33mParsing started! \x1b[0m', requestContext.request);
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext: any) {
        console.log('\x1b[33mValidation started! \x1b[0m', requestContext.request);
      },
    };
  },
};

export default logs;