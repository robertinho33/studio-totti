// ==========================================================
// 1. CONFIGURAÇÃO DO FIREBASE (API Modular V9+)
// ==========================================================

// Importa os módulos necessários do Firebase (Auth e Firestore)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// DICA: Substitua "10.12.2" pela versão mais recente do Firebase.

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAgZNo-qxmw5ZVYDZyGfY1VRl1X2oZtfnc",
    authDomain: "shopp-31204.firebaseapp.com",
    projectId: "shopp-31204",
    storageBucket: "shopp-31204.firebasestorage.app",
    messagingSenderId: "29785147500",
    appId: "1:29785147500:web:079e0004c15233b5b07049",
    measurementId: "G-MB1LYDF3EX"
};

// Inicializa o Firebase e os serviços
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Opcional, mas útil
const auth = getAuth(app); // Serviço de Autenticação
const db = getFirestore(app); // Serviço de Banco de Dados (Firestore)

// ==========================================================
// 2. LÓGICA DE CADASTRO DE CLIENTE
// ==========================================================

// ... (Seção 2: LÓGICA DE CADASTRO DE CLIENTE) ...

document.addEventListener('DOMContentLoaded', () => {
    
    // ... (Lógica para formCadastro aqui) ...
    
    // NOVO: Lógica para o formulário de contato
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', handleEnviarContato);
    }
});

// REMOVA a definição "window.Enviar =" e use o nome da função no listener.
async function handleEnviarContato(e) { 
    e.preventDefault(); // Impedir o recarregamento da página

    const nome = document.getElementById('nomeid').value;
    const fone = document.getElementById('foneid').value;
    const email = document.getElementById('emailid').value;
    const mensagem = document.querySelector('#form-contato textarea').value; // Seleciona a textarea dentro do formContato

    try {
        await addDoc(collection(db, "mensagens_contato"), {
            nome: nome,
            fone: fone,
            email: email,
            mensagem: mensagem,
            dataEnvio: new Date()
        });

        alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");
        
        // Limpar o formulário de contato
        document.getElementById('form-contato').reset(); 

    } catch (error) {
        console.error("Erro ao enviar mensagem de contato:", error);
        alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
}

// A lógica original do index.html pode ser mantida aqui, se necessário:
// document.getElementById('btnAgendar')?.addEventListener('click', () => {
//     window.location.href = 'agendamento.html';
// });
// ... Continuação do js/script.js ...

// ==========================================================
// 3. LÓGICA DE ENVIO DE CONTATO (SEM AUTENTICAÇÃO)
// ==========================================================

// Função global (necessária se for chamada via onclick)
window.Enviar = async function() {
  const nome = document.getElementById('nomeid').value;
  const fone = document.getElementById('foneid').value;
  const email = document.getElementById('emailid').value;
  const mensagem = document.querySelector('textarea').value;
  
  // Simplificado para apenas salvar no Firestore
  try {
      await addDoc(collection(db, "mensagens_contato"), {
          nome: nome,
          fone: fone,
          email: email,
          mensagem: mensagem,
          dataEnvio: new Date()
      });

      alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");

      // Opcional: Limpar o formulário de contato
      document.querySelector('form').reset(); 

  } catch (error) {
      console.error("Erro ao enviar mensagem de contato:", error);
      alert("Erro ao enviar mensagem. Tente novamente mais tarde.");
  }
}