async function getUser() {
  const response = await fetch('https://api.github.com/users/emilbacklund', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);
}

getUser();
