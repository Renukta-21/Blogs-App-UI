import {screen, render} from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'


test('Form calls eventHandler with correct details from props when new Blog created ', async()=>{
    const addNoteMock = vi.fn()
    render(<NewBlogForm
        createNote={addNoteMock}/>)
    const user = userEvent.setup()
    const buttonCreate = screen.getByText('Create')
    const inputs = screen.queryAllByRole('textbox')
    
    await user.type(inputs[0], 'Chacha very smooth')
    await user.type(inputs[1], 'Pablo Erika')
    await user.type(inputs[2], 'http//assaassa//sdadaa')

    await user.click( buttonCreate)
    expect(addNoteMock).toHaveBeenCalledWith({
        title:'Chacha very smooth',
        author:'Pablo Erika',
        url:'http//assaassa//sdadaa'

    })
    screen.debug(inputs)
    
    
})