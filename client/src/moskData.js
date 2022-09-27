import { v4 as uuidv4 } from 'uuid'

const mockData = [
    {
        id: uuidv4(),
        title: ' 📃 На паузе',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn JavaScript'
            },
            {
                id: uuidv4(),
                title: 'Learn Git'
            },
            {
                id: uuidv4(),
                title: 'Learn Python'
            },
        ]
    },
    {
        id: uuidv4(),
        title: ' ✏️ Вырезать',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn CSS'
            },
            {
                id: uuidv4(),
                title: 'Learn Golang'
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Вырезан',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML'
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Доставлен в МрК',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML'
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Отправлен клиенту',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML'
            }
        ]
    },
    {
        id: uuidv4(),
        title: ' ✔️ Доставлен клиенту',
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML'
            }
        ]
    }
]

export default mockData