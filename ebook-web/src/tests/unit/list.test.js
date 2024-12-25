import { shallowMount, createLocalVue } from '@vue/test-utils'
import jest, {
    describe, it, expect,
    beforeEach 
} from 'jest-mock'
import ElementUI from 'element-ui'
import List from '@/views/book/list.vue'
import { deleteBook } from '@/api/book'

jest.mock('@/api/book')

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('List.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(List, {
      localVue,
      mocks: {
        $router: {
          push: jest.fn()
        },
        $confirm: jest.fn().mockResolvedValue(true),
        $notify: jest.fn()
      }
    })
  })

  it('calls handleCreate and navigates to /book/create', () => {
    wrapper.vm.handleCreate()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/book/create')
  })

  it('calls handleUpdate and navigates to /book/edit/:fileName', () => {
    const row = { fileName: 'test.pdf' }
    wrapper.vm.handleUpdate(row)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/book/edit/test.pdf')
  })

  it('calls handleDelete and deletes the book', async () => {
    const row = { fileName: 'test.pdf' }
    deleteBook.mockResolvedValue({ msg: '删除成功' })
    await wrapper.vm.handleDelete(row)
    expect(deleteBook).toHaveBeenCalledWith('test.pdf')
    expect(wrapper.vm.$notify).toHaveBeenCalledWith({
      title: '成功',
      message: '删除成功',
      type: 'success',
      duration: 2000
    })
  })
})
