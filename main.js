const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

const dragStart = (event) => {
    event.dataTransfer.setData('text', event.target.id)
}

const dragEnter = (event) => {
    if(!event.target.classList.contains('dropped'))
    event.target.classList.add('droppable-hover');
}

const dragOver = (event) => {
    if(!event.target.classList.contains('dropped'))
    event.preventDefault();
}

const dragLeave = (event) => {
    if(!event.target.classList.contains('dropped'))
    event.target.classList.remove('droppable-hover');
}

const drop = (event) => {
    event.preventDefault();
    event.target.classList.remove('droppable-hover');
    const draggableElementData = event.dataTransfer.getData('text');
    const droppableElementData = event.target.getAttribute('data-draggable-id');
    if (draggableElementData === droppableElementData) {
        event.target.classList.add('dropped');
        const draggableElement = document.getElementById(draggableElementData);
        event.target.style.backgroundColor = draggableElement.style.color;
        draggableElement.classList.add('dragged');
        draggableElement.setAttribute('draggable', 'false');
        event.target.insertAdjacentHTML('afterbegin', `<i class="fa fa-${draggableElementData}"></i>`);
    }
}

draggableElements.forEach(ele => {
    ele.addEventListener('dragstart', dragStart); //other two event are drag and dragend, drag is called multiple times as the item is dragged on the screen.
});

droppableElements.forEach(ele => {
    ele.addEventListener('dragenter', dragEnter)  // dragenter->dragover->dragleave->drop are the events fired by elements on which other elements are dropped.
    ele.addEventListener('dragover', dragOver);
    ele.addEventListener('dragleave', dragLeave);
    ele.addEventListener('drop', drop);
});

