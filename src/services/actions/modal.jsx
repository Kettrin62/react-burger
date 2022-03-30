export const OPEN_MODAL ='OPEN_MODAL';
export const CLOSE_MODAL ='CLOSE_MODAL';


export function getCard(card) {
  return function(dispatch) {
    dispatch({
      type: OPEN_MODAL,
      card: card
    })
  }
};

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
};
