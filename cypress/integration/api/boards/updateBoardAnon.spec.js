/// <reference types="Cypress" />

describe('Update board name as anon user', { tags: '@api' }, () => {

  let boardName = 'new name';
  let board;
  let response;

  before(() => {
    cy
      .task('seed:db', 'oneBoardAnonUser')
      .then(dbData => {
        board = dbData.boards[0];
        cy
          .updateBoardApi({
            boardId: dbData.boards[0].id,
            body: {
              name: boardName,
            },
          })
          .then(res => {
            response = res;
          });
      });
  });

  beforeEach(() => {
    cy
      .wrap(response)
      .as('updateBoardAnon');
  });

  it('Status code should be 200', () => {
    cy
      .get('@updateBoardAnon')
      .then(data => {
        expect(data.status).to.eq(200);
      });
  });

  it('Body should contain properties', () => {
    cy
      .get('@updateBoardAnon')
      .then(data => {
        expect(data.body).to.have.ownProperty('user');
        expect(data.body).to.have.ownProperty('starred');
        expect(data.body).to.have.ownProperty('id');
        expect(data.body).to.have.ownProperty('created');
        expect(data.body).to.have.ownProperty('name', boardName);
      });
  });

  it('New board should be in DB', () => {
    cy
      .getBoard({
        boardId: board.id,
      })
      .then(res => {
        expect(res.status).to.eq(200);
        expect(res.body.id).to.eq(board.id);
        expect(res.body.user).to.eq(board.user);
        expect(res.body.starred).to.eq(board.starred);
        expect(res.body.created).to.eq(board.created);
        expect(res.body.name).to.eq(boardName);
      });
  });

  it('New board should be on board listing', () => {
    cy
      .getBoards({})
      .then(res => {
        const firstBoard = res.body[0];
        expect(res.status).to.eq(200);
        expect(firstBoard.id).to.eq(board.id);
        expect(firstBoard.user).to.eq(board.user);
        expect(firstBoard.starred).to.eq(board.starred);
        expect(firstBoard.created).to.eq(board.created);
        expect(firstBoard.name).to.eq(boardName);
      });
  });
});

describe('Star board as anon user', { tags: '@api' }, () => {

  let board;
  let response;

  before(() => {
    cy
      .task('seed:db', 'oneBoardAnonUser')
      .then(dbData => {
        board = dbData.boards[0];
        cy
          .updateBoardApi({
            boardId: dbData.boards[0].id,
            body: {
              starred: true,
            },
          })
          .then(res => {
            response = res;
          });
      });
  });

  beforeEach(() => {
    cy
      .wrap(response)
      .as('updateBoardAnon');
  });

  it('Status code should be 200', () => {
    cy
      .get('@updateBoardAnon')
      .then(data => {
        expect(data.status).to.eq(200);
      });
  });

  it('Body should contain properties', () => {
    cy
      .get('@updateBoardAnon')
      .then(data => {
        expect(data.body).to.have.ownProperty('user');
        expect(data.body).to.have.ownProperty('starred');
        expect(data.body).to.have.ownProperty('id');
        expect(data.body).to.have.ownProperty('created');
        expect(data.body).to.have.ownProperty('name');
      });
  });

  it('New board should be in DB', () => {
    cy
      .getBoard({
        boardId: board.id,
      })
      .then(res => {
        expect(res.status).to.eq(200);
        expect(res.body.id).to.eq(board.id);
        expect(res.body.user).to.eq(board.user);
        expect(res.body.starred).to.be.true;
        expect(res.body.created).to.eq(board.created);
        expect(res.body.name).to.eq(board.name);
      });
  });

  it('New board should be on board listing', () => {
    cy
      .getBoards({})
      .then(res => {
        const firstBoard = res.body[0];
        expect(res.status).to.eq(200);
        expect(firstBoard.id).to.eq(board.id);
        expect(firstBoard.user).to.eq(board.user);
        expect(firstBoard.starred).to.be.true;
        expect(firstBoard.created).to.eq(board.created);
        expect(firstBoard.name).to.eq(board.name);
      });
  });
});

describe('Update board that belongs to different user', { tags: '@api' }, () => {

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
                    headers: {
                      Authorization: `Bearer ${testData.token}`,
                    },
                    body: {
                      name: testData.boardName,
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

  it('Status code should be 403', () => {
    cy
      .get('@updateBoardLogged')
      .then(data => {
        expect(data.status).to.eq(403);
      });
  });

  it('Board should not be updated', () => {
    cy
      .getBoard({
        boardId: testData.board.id,
        headers: {
          Authorization: `Bearer ${testData.token}`,
        },
      })
      .then(res => {
        expect(res.body.name).to.eq(testData.board.name);
      });
  });
});
