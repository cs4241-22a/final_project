<div class="column has-background-primary" id="submit_resource">
    <h1 class="title is-2 has-text-centered">Submit A Resource</h1>
    <!--Submit Resource Form-->
    <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" placeholder="Name" id="name">
        </div>
      </div>
      
      
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email input" id="email">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Resource Title</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Title" id="resource_title">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </div>
      </div>
      
      <div class="field">
        <label class="label">Resource Link</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="url" placeholder="URL" id="resource_link">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">What Subject is this?</label>
        <div class="control">
          <div class="select">
            <select id="subject">
              <option>Fullstack/Design</option>
              <option>Theory</option>
              <option>Cybersecurity</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="field">
        <label class="label">Give a small description of the resource</label>
        <div class="control">
          <textarea class="textarea" placeholder="Textarea" id="desc"></textarea>
        </div>
      </div>
      
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" id="submit">Submit</button>
        </div>
        <div class="control">
          <button class="button is-link is-light" id="cancel">Cancel</button>
        </div>
      </div>    
</div>