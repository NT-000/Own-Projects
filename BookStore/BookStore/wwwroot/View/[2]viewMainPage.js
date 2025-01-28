
function updateViewMainPage() {
  getAppDiv().innerHTML =
        `<h1>Welcome ${model.input.currentUser.name}</h1>
       <div class="outercontainerMainPage">
       <div class="innercontainerMainPage">
</div>
        <div class="navButtons">
        ${createNavButtons()}
</div>  
</div>    
        `;
}