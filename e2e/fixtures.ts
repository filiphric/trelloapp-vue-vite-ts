import { test as base, expect } from '@playwright/test'

export { expect }

export const DEFAULT_USER = { email: 'filip@example.com', password: 'Asdf.1234#' }

type Board = { id: number; name: string; [key: string]: any }
type List = { id: number; name: string; [key: string]: any }
type Card = { id: number; name: string; [key: string]: any }
type User = { accessToken: string; email: string; [key: string]: any }

type ApiHelpers = {
  resetData: () => Promise<void>
  loginUser: () => Promise<User>
  addBoardApi: (name: string) => Promise<Board>
  addListApi: (boardId: number, name: string) => Promise<List>
  addCardApi: (boardId: number, listId: number, name: string) => Promise<Card>
  signupApi: (email: string, password: string, login?: boolean) => Promise<User>
}

type TestFixtures = {
  api: ApiHelpers
}

export const test = base.extend<TestFixtures>({
  api: async ({ request, context }, use) => {
    const signupApi = async (email: string, password: string, login = true) => {
      const response = await request.post('/api/signup', {
        data: { email, password },
      })
      const body = await response.json()
      if (login) {
        await context.addCookies([
          {
            name: 'auth_token',
            value: body.accessToken,
            domain: 'localhost',
            path: '/',
          },
        ])
      }
      return body
    }

    const helpers: ApiHelpers = {
      async resetData() {
        await request.post('/api/reset')
      },

      async loginUser() {
        return signupApi(DEFAULT_USER.email, DEFAULT_USER.password)
      },

      signupApi,

      async addBoardApi(name: string) {
        const response = await request.post('/api/boards', { data: { name } })
        return response.json()
      },

      async addListApi(boardId: number, name: string) {
        const response = await request.post('/api/lists', {
          data: { boardId, name },
        })
        return response.json()
      },

      async addCardApi(boardId: number, listId: number, name: string) {
        const response = await request.post('/api/cards', {
          data: { boardId, listId, name, order: 0 },
        })
        return response.json()
      },
    }

    await use(helpers)
  },

})
