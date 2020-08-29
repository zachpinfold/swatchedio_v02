import React, { useEffect } from "react";
import SwatchList from "./SwatchList";
import { connect } from "react-redux";
import SwatchActionButton from "./SwatchActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sortSwatches, loadProjects } from "../../actions/swatch";
import { closeDiscover } from "../../actions/layout";
import { secondPageReset } from "../../actions/colors";
import { testAction } from "../../actions/testAction";
import styled from "styled-components";
import { API, graphqlOperation } from "aws-amplify";

const ProjectPage = ({
  projectList,
  sortSwatches,
  closeDiscover,
  secondPageReset,
  testAction,
  test,
  loadProjects
}) => {
  useEffect(() => {
    loadProjects();
    secondPageReset();
    closeDiscover();
    document.body.style.background = "blue";
  }, []);

  // createPostListener =

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    sortSwatches(
      projectList.projects,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };

  const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 100px;
    position: absolute;
    height: auto;
    width: 100%;
  `;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='all-lists' direction='horizontal' type='list'>
          {provided => (
            <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
              {projectList.projects.map((project, index) => (
                <SwatchList
                  listId={project.id}
                  title={project.projectTitle}
                  swatches={project.swatches.items}
                  key={project.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <SwatchActionButton list />
            </ListContainer>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

const styles = {
  listContainer: {
    display: "flex",
    flexDirection: "row",
    // width: "100vw",
    marginLeft: 20,
    paddingRight: 20,
    position: "absolute",
    marginTop: 100
  }
};

const mts = state => ({
  projectList: state.swatchReducer,
  test: state.test
});

export default connect(mts, {
  sortSwatches,
  closeDiscover,
  secondPageReset,
  testAction,
  loadProjects
})(ProjectPage);
