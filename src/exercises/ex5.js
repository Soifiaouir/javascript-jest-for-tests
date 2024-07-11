const hoverArea = document.getElementById('hover-area');
const interactionResult = document.getElementById('interaction-result');//appel des ellements html dont nous avanonc besoins

hoverArea.addEventListener('mouseover', () => {//mise en place des changement au survol de la div
  hoverArea.style.backgroundColor = 'red';
  interactionResult.textContent = "You are hovering over the area!";
});

hoverArea.addEventListener('mouseout', () => {
  hoverArea.style.backgroundColor = 'greenyellow';//simulation de remise à l'état
  interactionResult.textContent = "Hover over the area.";
});
