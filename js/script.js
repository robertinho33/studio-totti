document.addEventListener('DOMContentLoaded', function() {
  const btnAgendar = document.getElementById('btnAgendar');
  if (btnAgendar) {
      btnAgendar.addEventListener('click', function() {
          // Redireciona para a página de agendamento
          window.location.href = 'agendamento.html';
      });
  }

  // Adicione aqui qualquer outra lógica JavaScript necessária para o seu site.
});
// Acessando as funções e instâncias que você expôs na seção 1.a
const auth = window.auth;
const db = window.db;

document.getElementById('form-cadastro-cliente').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nome = document.getElementById('nome-cliente').value;
    // ... outros dados que você queira

    try {
        // ETAPA 1: CRIAR O USUÁRIO NO FIREBASE AUTH (Autenticação)
        const userCredential = await window.createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        
        console.log("Usuário autenticado com sucesso! UID:", user.uid);

        // ETAPA 2: SALVAR OS DADOS ADICIONAIS NO CLOUD FIRESTORE (Database)
        // Criaremos uma nova coleção chamada 'clientes'
        await window.addDoc(window.collection(db, "clientes"), {
            uid: user.uid, // Armazena o ID do usuário do Auth para referência
            nome: nome,
            email: email,
            dataCadastro: new Date()
            // ... adicione mais campos aqui
        });

        alert("Cliente cadastrado com sucesso!");
        // Redirecione ou limpe o formulário
        document.getElementById('form-cadastro-cliente').reset();

    } catch (error) {
        // Tratar erros, como e-mail já em uso ou senha fraca
        let errorMessage = "Erro ao cadastrar cliente.";
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "Este e-mail já está em uso.";
                break;
            case 'auth/weak-password':
                errorMessage = "A senha é muito fraca. Mínimo de 6 caracteres.";
                break;
            default:
                errorMessage += ` Código: ${error.code}`;
                break;
        }
        console.error("Erro de cadastro:", error);
        alert(errorMessage);
    }
});