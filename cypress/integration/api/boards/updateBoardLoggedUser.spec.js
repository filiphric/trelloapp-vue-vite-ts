/// <reference types="Cypress" />

describe('Update board name as logged user', { tags: '@api' }, () => {

  const testData = {
    board    : undefined ,
    boardName: 'new name',
    response : undefined ,
    token    : undefined ,
  };

  before(() => {
    cy
      .task('seed:db', 'oneBoardLoggedUser')
      .then(dbData => {
        testData.board = dbData.boards[0];
        cy
          .fixture('credentials')
          .then(user => {
            cy
              .logInApi(user)
              .then(res => {
                testData.token = res.body.accessToken;
                cy
                  .updateBoardApi({
                    boardId: dbData.boards[0].id,
                    body: {
                      name: testData.boardName,
                    },
                    headers: {
                      Authorization: `Bearer ${testData.token}`
                    },
                  })
                  .then(res => {
                    testData.response = res;
                  });
              });
          });
      });
  });

  beforeEach(() => {
    cy
      .wrap(testData.response)
      .as('updateBoardLogged');
  });

  it('Status code should be 200', () => {
    cy
      .get('@updateBoardLogged')
      .then(data => {
        expect(data.status).to.eq(200);
      });
  });

  it('Body should contain properties', () => {
    cy
      .get('@updateBoardLogged')
      .then(data => {
        expect(data.body).to.have.ownProperty('user');
        expect(data.body).to.have.ownProperty('starred');
        expect(data.body).to.have.ownProperty('id');
        expect(data.body).to.have.ownProperty('created');
        expect(data.body).to.have.ownProperty('name', testData.boardName);
      });
  });

  it('New board should be in DB', () => {
    cy
      .getBoard({
        boardId: testData.board.id,
        headers: {
          Authorization: `Bearer ${testData.token}`
        },
      })
      .then(res => {
        expect(res.status).to.eq(200);
        expect(res.body.id).to.eq(testData.board.id);
        expect(res.body.user).to.eq(testData.board.user);
        expect(res.body.starred).to.eq(testData.board.starred);
        expect(res.body.created).to.eq(testData.board.created);
        expect(res.body.name).to.eq(testData.boardName);
      });
  });

  it('New board should be on board listing', () => {
    cy
      .getBoards({
        headers: {
          Authorization: `Bearer ${testData.token}`
        },
      })
      .then(res => {
        const firstBoard = res.body[0];
        expect(res.status).to.eq(200);
        expect(firstBoard.id).to.eq(testData.board.id);
        expect(firstBoard.user).to.eq(testData.board.user);
        expect(firstBoard.starred).to.eq(testData.board.starred);
        expect(firstBoard.created).to.eq(testData.board.created);
        expect(firstBoard.name).to.eq(testData.boardName);
      });
  });
});

describe('Star board name as anon user', { tags: '@api' }, () => {

  const testData = {
    board    : undefined,
    response : undefined,
    token    : undefined,
  };

  before(() => {
    cy
      .task('seed:db', 'oneBoardLoggedUser')
      .then(dbData => {
        testData.board = dbData.boards[0];
        cy
          .fixture('credentials')
          .then(user => {
            cy
              .logInApi(user)
              .then(res => {
                testData.token = res.body.accessToken;
                cy
                  .updateBoardApi({
                    boardId: dbData.boards[0].id,
                    body: {
                      starred: true,
                    },
                    headers: {
                      Authorization: `Bearer ${testData.token}`
                    },
                  })
                  .then(res => {
                    testData.response = res;
                  });
              });
          });
      });
  });

  beforeEach(() => {
    cy
      .wrap(testData.response)
      .as('updateBoardLogged');
  });

  it('Status code should be 200', () => {
    cy
      .get('@updateBoardLogged')
      .then(data => {
        expect(data.status).to.eq(200);
      });
  });

  it('Body should contain properties', () => {
    cy
      .get('@updateBoardLogged')
      .then(data => {
        expect(data.body).to.have.ownProperty('user');
        expect(data.body).to.have.ownProperty('starred', true);
        expect(data.body).to.have.ownProperty('id');
        expect(data.body).to.have.ownProperty('created');
        expect(data.body).to.have.ownProperty('name');
      });
  });

  it('New board should be in DB', () => {
    cy
      .getBoard({
        boardId: testData.board.id,
        headers: {
          Authorization: `Bearer ${testData.token}`
        },
      })
      .then(res => {
        expect(res.status).to.eq(200);
        expect(res.body.id).to.eq(testData.board.id);
        expect(res.body.user).to.eq(testData.board.user);
        expect(res.body.starred).to.be.true;
        expect(res.body.created).to.eq(testData.board.created);
        expect(res.body.name).to.eq(testData.board.name);
      });
  });

  it('New board should be on board listing', () => {
    cy
      .getBoards({
        headers: {
          Authorization: `Bearer ${testData.token}`
        },
      })
      .then(res => {
        const firstBoard = res.body[0];
        expect(res.status).to.eq(200);
        expect(firstBoard.id).to.eq(testData.board.id);
        expect(firstBoard.user).to.eq(testData.board.user);
        expect(firstBoard.starred).to.be.true;
        expect(firstBoard.created).to.eq(testData.board.created);
        expect(firstBoard.name).to.eq(testData.board.name);
      });
  });
});
