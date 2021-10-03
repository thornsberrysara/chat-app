let client, username;

client = new StreamChat("6newfzcbjmku");

const inputElement = document.getElementById("message-input");
inputElement.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    sendMessage(inputElement.value);
    inputElement.value = "";
  }
});

async function generateToken(username) {
  const { token } = (await axios.get(`/token?username=${username}`)).data;
  return token;
}

const user = document.getElementById("user-login-input");
user.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    checkAuthState();
  }
});
checkAuthState();

async function checkAuthState() {
  if (!user.value) {
    document.getElementById("login-block").style.display = "grid";
    document.getElementsByClassName("chat-container")[0].style.display = "none";
  } else {
    username = user.value;
    await initializeClient();
    document.getElementsByClassName("chat-container")[0].style.display = "grid";
    document.getElementById("login-block").style.display = "none";
  }
}

async function initializeClient() {
  const token = await generateToken(username);
  await client.setUser(
    {
      id: username,
      name: "Name",
    },
    token
  );

  return client;
}
