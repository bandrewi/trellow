import Card from "./Card"

export default function List({ list }) {

    return (
        <>
            <h1>{list.title}</h1>
            <ul>
                {list.cards.map(card => (
                    <li key={card.id}>
                        <Card card={card} />
                    </li>
                ))}
            </ul>
        </>
    )
}