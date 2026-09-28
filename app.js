$(document).ready(function () {
    $("#Search-btn").click(function () {
        $("#table-body").empty();
        const usr = $("#usr").val();
        if (usr === "")
        {
            alert("Please enter a valid GitHub user");
            return;
        }

        $.get("https://api.github.com/users/" + usr + "/repos", function (data) {
            if (data.length === 0) {
                alert("There are no public repos for this user");
                return;
            }
            data.forEach(function (repo) {
                const row =
                    `
                    <tr>
                        <td>${repo.name}</td>
                        <td>${repo.description || 'No description provided'}</td>
                        <td>${repo.language || 'N/A'}</td>
                        <td><a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repo</a></td>
                    </tr>
                    `
                $("#table-body").append(row);
            })
        })
            .fail(function () {
                    alert("An error with the GutHub API has occurred");
            })

    })

})