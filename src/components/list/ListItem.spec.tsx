import { render } from '@testing-library/react';
import ListItem from '@/components/list/ListItem';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import List from '@/typings/list';

it('mounts component', () => {
  const list: List = {
    boardId: 1,
    name: 'list',
    order: 0,
    created: '2022-05-06',
    id: 1,
    cards: [],
  };

  render(
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="board" type="list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ListItem list={list} index={0} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});
