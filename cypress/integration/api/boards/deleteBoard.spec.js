/// <reference types="Cypress" />

describe('Delete board as anon user', { tags: '@api' }, () => {

  let response;

  before(() => {
    cy
      .task('seed:db', 'oneBoardAnonUser')
      .then(dbData => {
        cy
          .deleteBoardApi({ boardId: dbData.boards[0].id })
          .then(res => {
            response = res;
          });
      });
  });

  beforeEach(() => {
    cy
      .wrap(response)
      .as('deleteBoardAnon');
  });

  it('Status code should be 200', () => {
    cy
      .get('@deleteBoardAnon')
      .then(data => {
        expect(data.status).to.eq(200);
      });
  });

  it('Empty object should be returned', () => {
    cy
      .get('@deleteBoardAnon')
      .then(data => {
        expect(data.body).to.be.empty;
      });
  });
});

describe('Delete board as logged user', { tags: '@api' }, () => {

  let response;

  before(() => {
    cy
      .task('seed:db', 'oneBoardLoggedUser')
      .then(dbData => {
        cy
          .fixture('credentials')
          .then(user => {
            cy
              .logInApi(user)
              .then(res => {
                cy
                  .deleteBoardApi({
                    headers: {
                      Authorization: `Bearer ${res.body.accessToken}`,
                    },
                    boardId: dbData.boards[0].id
                  })
                  .then(res => {
                    response = res;
                  });
              })
          });
      });
  });

  beforeEach(() => {
    cy
      .wrap(response)
      .as('deleteBoardLogged');
  });

  it('Status code should be 200', () => {
    cy
      .get('@deleteBoardLogged')
      .then(data => {
        expect(data.status).to.eq(200);
      });
  });

  it('Empty object should be returned', () => {
    cy
      .get('@deleteBoardLogged')
      .then(data => {
        expect(data.body).to.be.empty;
      });
  });
});

describe('Delete board that belongs to different user', { tags: '@api' }, () => {

  let response;

  before(() => {
    cy
      .task('seed:db', 'oneBoardLoggedUser')
      .then(dbData => {
        cy
          .deleteBoardApi({ boardId: dbData.boards[0].id })
          .then(res => {
            response = res;
          });
      });
  });

  beforeEach(() => {
    cy
      .wrap(response)
      .as('deleteBoardAnon');
  });

  it('Status code should be 403', () => {
    cy
      .get('@deleteBoardAnon')
      .then(data => {
        expect(data.status).to.eq(403);
      });
  });

  it('Board should still exist', () => {
    cy
      .get('@deleteBoardAnon')
      .then(body => {
        cy
          .getBoard({ boardId: body.id })
          .then(body => {
            expect(body).not.be.empty;
            expect(body).to.haveOwnProperty('id', boardId);
          });
      });
  });
});
