/// <reference types="Cypress" />

import useful from 'useful-library';

describe('Create board as anon user', { tags: '@api' }, () => {

  let boardName = 'test';
  let response;

  before(() => {
    cy
      .task('seed:db', 'empty');

    cy
      .createBoardApi({
        body: {
          name: boardName,
        },
      })
      .then(res => {
        response = res;
      });
  });

  beforeEach(() => {
    cy
      .wrap(response)
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
        expect(data.body).to.have.ownProperty('user');
        expect(data.body).to.have.ownProperty('starred');
        expect(data.body).to.have.ownProperty('id');
        expect(data.body).to.have.ownProperty('created');
        expect(data.body).to.have.ownProperty('name');
      });
  });

  it(`Board name should match "${boardName}"`, () => {
    cy
      .get('@newBoardAnon')
      .then(data => {
        expect(data.body.name).to.eq(boardName);
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
      .getBoards({})
      .then(data => {
        expect(data.body).to.have.length(1);
      });
  });

  it('Board detail should be retrieved', () => {
    cy
      .get('@newBoardAnon')
      .then(data => {
        cy
          .getBoard({ boardId: data.body.id })
          .then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(data.body.id);
            expect(response.body.name).to.eq(data.body.name);
          })
      });
  });
});
