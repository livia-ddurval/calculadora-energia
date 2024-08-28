document.addEventListener("DOMContentLoaded", function() {
    carregarComodos();
    carregarEquipamentos();
    carregarBandeiras();

    const comodoSelect = document.getElementById("comodo");
    comodoSelect.addEventListener("change", function() {
        atualizarEquipamentos(comodoSelect.value);
    });

    const equipamentoSelect = document.getElementById("equipamento");
    equipamentoSelect.addEventListener("change", function() {
        const potenciaInput = document.getElementById("potencia");
        potenciaInput.value = equipamentoSelect.selectedOptions[0].getAttribute('data-potencia');
    });
});

const equipamentosPorComodo = {
    "Sala": [
        { nome: "Televisão", potencia: 120 },
        { nome: "Lâmpada LED", potencia: 10 },
        { nome: "Ar-condicionado", potencia: 1000 },
        { nome: "Ventilador", potencia: 100 }

    ],
    "Quarto": [
        { nome: "Televisão", potencia: 120 },
        { nome: "Ar-condicionado", potencia: 1000 },
        { nome: "Lâmpada LED", potencia: 10 },
        { nome: "Ventilador", potencia: 100 }

    ],
    "Cozinha": [
        { nome: "Geladeira", potencia: 150 },
        { nome: "Máquina de lavar", potencia: 500 }
    ],
    "Lavanderia": [
        { nome: "Geladeira", potencia: 150 },
        { nome: "Máquina de lavar", potencia: 500 }
    ],
    "Banheiro": [
        { nome: "Lâmpada LED", potencia: 10 }
    ]
};

function carregarComodos() {
    const comodos = ["Sala", "Quarto", "Cozinha", "Banheiro"];
    const comodoSelect = document.getElementById("comodo");

    comodos.forEach(comodo => {
        const option = document.createElement("option");
        option.value = comodo;
        option.text = comodo;
        comodoSelect.appendChild(option);
    });
}

function carregarEquipamentos() {
    // Inicialmente, carregar equipamentos com base no primeiro cômodo
    atualizarEquipamentos(document.getElementById("comodo").value);
}

function carregarBandeiras() {
    const bandeiras = [
        { nome: "Verde", valor:  1.88 },
        { nome: "Amarela", valor: 1.343 },
        { nome: "Vermelha - Patamar 1", valor: 4.169 },
        { nome: "Vermelha - Patamar 2", valor: 6.243 }
    ];
    const bandeiraSelect = document.getElementById("bandeira");

    bandeiras.forEach(bandeira => {
        const option = document.createElement("option");
        option.value = bandeira.valor;
        option.text = bandeira.nome;
        bandeiraSelect.appendChild(option);
    });
}

function atualizarEquipamentos(comodo) {
    const equipamentos = equipamentosPorComodo[comodo] || [];
    const equipamentoSelect = document.getElementById("equipamento");

    // Limpar opções existentes
    equipamentoSelect.innerHTML = "";

    // Adicionar novas opções
    equipamentos.forEach(equipamento => {
        const option = document.createElement("option");
        option.value = equipamento.nome;
        option.text = equipamento.nome;
        option.setAttribute('data-potencia', equipamento.potencia);
        equipamentoSelect.appendChild(option);
    });

    // Atualizar a potência do equipamento
    const potenciaInput = document.getElementById("potencia");
    potenciaInput.value = "";
}

function calcularEnergia() {
    const comodo = document.getElementById("comodo").value;
    const equipamento = document.getElementById("equipamento").value;
    const potencia = parseFloat(document.getElementById("potencia").value);
    const tempo = parseFloat(document.getElementById("tempo").value);
    const bandeiraValor = parseFloat(document.getElementById("bandeira").value);

    if (isNaN(potencia) || isNaN(tempo) || isNaN(bandeiraValor) || !comodo || !equipamento) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const consumo = (potencia * tempo) / 1000;
    const custo = consumo * bandeiraValor;

    const resultadoModalContent = `
        <p><strong>Cômodo:</strong> ${comodo}</p>
        <p><strong>Equipamento:</strong> ${equipamento}</p>
        <p><strong>Potência:</strong> ${potencia} W</p>
        <p><strong>Tempo de Uso:</strong> ${tempo} horas</p>
        <p><strong>Bandeira Tarifária:</strong> ${document.getElementById("bandeira").selectedOptions[0].text}</p>
        <p><strong>Consumo Diário:</strong> ${consumo.toFixed(2)} kWh</p>
        <p><strong>Custo Diário Estimado:</strong> R$ ${custo.toFixed(2)}</p>
    `;

    document.getElementById('resultadoModalContent').innerHTML = resultadoModalContent;
    const resultadoModal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    resultadoModal.show();
}
