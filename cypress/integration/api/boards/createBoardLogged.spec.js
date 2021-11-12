/// <reference types="Cypress" />

import useful from 'useful-library';

describe('Create board as logged user', { tags: '@api' }, () => {

  const testData = {
    boardName: 'test',
    response: undefined,
    userId: undefined,
    token: undefined,
  };

  before(() => {
    cy
      .task('seed:db', 'emptyOneUser')
      .then(dbData => {
        testData.userId = dbData.users[0].id;
      });

    cy
      .fixture('credentials')
      .then(user => {
        cy
          .logInApi(user)
          .then(res => {
            testData.token = res.body.accessToken;
            cy
              .createBoardApi({
                headers: {
                  Authorization: `Bearer ${res.body.accessToken}`,
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

  beforeEach(() => {
    cy
      .wrap(testData.response)
      .as('newBoardAnon');
  });

  it('Status code should be 201', () => {
    cy
      .get('@newBoardAnon')
      .then(data => {
        expect(data.status).to.eq(201);
      });
  });

  it('Body should contain properties', () => {
    cy
      .get('@newBoardAnon')
      .then(data => {
        expect(data.body).to.have.ownProperty('user', testData.userId);
        expect(data.body).to.have.ownProperty('starred');
        expect(data.body).to.have.ownProperty('id');
        expect(data.body).to.have.ownProperty('created');
        expect(data.body).to.have.ownProperty('name');
      });
  });

  it(`Board name should match "${testData.boardName}"`, () => {
    cy
      .get('@newBoardAnon')
      .then(data => {
        expect(data.body.name).to.eq(testData.boardName);
      });
  });

  it('Board should be created today', () => {
    cy
      .get('@newBoardAnon')
      .then(data => {
        expect(data.body.created).to.eq(useful.yyyyMmDd().replace(/\//g, '-'));
      });
  });

  it('Board should not be starred', () => {
    cy
      .get('@newBoardAnon')
      .then(data => {
        expect(data.body.starred).to.be.false;
      });
  });

  it('Board should exist in the DB', () => {
    cy
      .getBoards({
        headers: {
          Authorization: `Bearer ${testData.token}`
        },
      })
      .then(data => {
        expect(data.body).to.have.length(1);
      });
  });

  it('Board detail should be retrieved', () => {
    cy
      .get('@newBoardAnon')
      .then(data => {
        cy
          .getBoard({
            headers: {
              Authorization: `Bearer ${testData.token}`
            },
            boardId: data.body.id,
          })
          .then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(data.body.id);
            expect(response.body.name).to.eq(data.body.name);
          })
      });
  });
});
