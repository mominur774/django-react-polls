import React from 'react'

const fruits = [
    {
        'id': 1,
        'name': 'Orange'
    },
    {
        'id': 2,
        'name': 'Banana'
    },
    {
        'id': 3,
        'name': 'Apple'
    },
    {
        'id': 4,
        'name': 'Mango'
    }
]

const Test = () => {

    const handleChange = (e) => {
        localStorage.setItem('fruit', e.target.value)
    }
    return (
        <div>

            <div>
                <label className='mb-3' htmlFor="fruits">Select a fruit</label>
                {fruits.map(fruit => (
                    <div className='' key={fruit.id}>
                        <input
                            type="radio"
                            name="fruit"
                            value={fruit.id}
                            onChange={handleChange}
                            checked={fruit.id === parseInt(localStorage?.getItem('fruit'))}
                        />
                        <label className='ms-2' htmlFor="fruit">{fruit.name}</label>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Test