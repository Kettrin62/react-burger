export const Container = memo(function Container() {
  const [cards, setCards] = useState(ITEMS);

  const findCard = useCallback((id) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
          card,
          index: cards.indexOf(card),
      };
  }, [cards]);

  const moveCard = useCallback((id, atIndex) => {
      const { card, index } = findCard(id);
      setCards(update(cards, {
          $splice: [
              [index, 1],
              [atIndex, 0, card],
          ],
      }));
  }, [findCard, cards, setCards]);

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  return (<div ref={drop} style={style}>
    {cards.map((card) => (<Card key={card.id} id={`${card.id}`} text={card.text} moveCard={moveCard} findCard={findCard}/>))}
  </div>);
});


export const Card = memo(function Card({ id, text, moveCard, findCard, }) {
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: (monitor) => ({
          isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
          const { id: droppedId, originalIndex } = item;
          const didDrop = monitor.didDrop();
          if (!didDrop) {
              moveCard(droppedId, originalIndex);
          }
      },
  }), [id, originalIndex, moveCard]);

  const [, drop] = useDrop(() => ({
      accept: ItemTypes.CARD,
      hover({ id: draggedId }) {
          if (draggedId !== id) {
              const { index: overIndex } = findCard(id);
              moveCard(draggedId, overIndex);
          }
      },
  }), [findCard, moveCard]);

  const opacity = isDragging ? 0 : 1;

  return (<div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
    {text}
  </div>);
});



