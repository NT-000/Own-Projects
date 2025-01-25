
function updateViewMainPage() {
    let app = document.getElementById('app');
  return app.innerHTML =
        `<h1>Welcome ${model.input.currentUser.name}</h1>
        <div class="navButtons">
        ${createNavButtons()}
</div>      
        `;
}