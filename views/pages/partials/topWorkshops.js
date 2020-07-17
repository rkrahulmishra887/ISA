<article class="workshopslist jumbotron d-none d-sm-block">
  <div class="container">
    <div class="row">
      <% topWorkshops.forEach(function(workshops) {%>
      <div class="col-md text-center">
        <h4 class="workshopslist-title"><%=workshop.title%></h4>
        <div class="workshopslist-name">
          with
          <a href="/sps/<%=workshop.shortname%>"><%=workshop.name%></a>
        </div>
        <p class="workshopslist-info mt-2">
          <a href="/workshops/<%=workshop.shortname%>">
            <img
              class="workshoplist-img rounded-circle"
              src="/images/workshop/<%=workshop.shortname%>_tn.jpg"
              alt="Photo of <%=workshop.name%>"
            />
          </a>
        </p>
      </div>
      <%})%>
    </div>
  </div>
</article>
