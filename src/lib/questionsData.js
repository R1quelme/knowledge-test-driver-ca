// All 111 questions extracted from the official document
// correct field uses 0-indexed position (a=0, b=1, c=2, d=3)
const ALL_QUESTIONS = [
  {
    id: 1,
    question: "Salvo indicação em contrário, qual é o limite básico de velocidade fora de uma cidade, vila ou vila em uma rodovia principal?",
    options: ["100 km/h", "90 km/h", "110 km/h", "80 km/h"],
    correct: 0
  },
  {
    id: 2,
    question: "Ao dar ré em um veículo de passageiros para a esquerda, o motorista deve:",
    options: [
      "Olhe no espelho retrovisor interno e faça os ajustes de direção necessários",
      "Olhe por cima do ombro direito com olhares ocasionais para a frente",
      "Olhe por cima do ombro esquerdo com olhares ocasionais para a frente",
      "Sem verificar o ombro, use os espelhos retrovisores internos e externos para garantir a melhor visão para trás e para os dois lados do veículo"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "Ao se aproximar de um cruzamento e se deparar com um semáforo que mostra uma seta verde para virar à direita e um sinal vermelho, o motorista:",
    options: [
      "Deve parar e esperar por uma luz verde antes de virar na direção da seta",
      "Pode passar direto pelo cruzamento sem parar",
      "Pode prosseguir quando seguro, sem parar, na direção da seta",
      "Pode virar à esquerda sem parar"
    ],
    correct: 2
  },
  {
    id: 4,
    question: "Alberta tem um sistema de pontos de demérito em que um motorista totalmente licenciado (não aprendiz, não probatório) é suspenso quando acumula:",
    options: ["15 pontos", "8 pontos", "5 pontos", "12 pontos"],
    correct: 0
  },
  {
    id: 5,
    question: "Ao ultrapassar um caminhão grande em uma rodovia de mão dupla, o motorista deve:",
    options: [
      "Deixe espaço extra antes de retornar à pista",
      "Retorne à faixa quando sinalizado pelos faróis do caminhão",
      "Retorne à faixa quando o caminhão não estiver mais visível em nenhum dos espelhos retrovisores",
      "Retorne à faixa deles depois de passar pelo para-choque dianteiro do caminhão"
    ],
    correct: 0
  },
  {
    id: 6,
    question: "Quais afirmações descrevem melhor os passos para virar à direita em um semáforo vermelho?",
    options: [
      "Nunca são permitidas curvas à direita em um semáforo vermelho",
      "Sinalize e certifique-se de que não há sinal proibindo a conversão, pare, olhe para a esquerda e para a direita, ceda a prioridade e prossiga",
      "Reduza a velocidade antes da curva, procure ciclistas à direita, sinalize e prossiga",
      "Sinalize e reduza a velocidade antes da curva, olhe à esquerda, ceda aos veículos e prossiga"
    ],
    correct: 1
  },
  {
    id: 7,
    question: "Este sinal indica:",
    image: "/signs/7.png",
    options: [
      "Percurso para viaturas com mais de 4500kg",
      "Percurso para veículos lentos",
      "Faixa reservada para ônibus",
      "Rota de mercadorias perigosas"
    ],
    correct: 3
  },
  {
    id: 8,
    question: "Uma única linha branca sólida entre as faixas de rodagem em uma área urbana significa:",
    options: [
      "É uma linha que separa o tráfego que viaja em direções opostas",
      "O tráfego à direita está se movendo mais rápido do que o tráfego à esquerda",
      "Mudança de faixa não é permitida",
      "A mudança de faixa é permitida"
    ],
    correct: 2
  },
  {
    id: 9,
    question: 'Uma "faixa de estacionamento" conforme definido no Manual do Motorista da Carteira Básica é:',
    options: [
      "Uma faixa mais próxima ao meio-fio, onde o estacionamento é permitido, mas não há parquímetros",
      "Todas essas respostas estão corretas",
      "A parte de uma rodovia principal entre a borda da rodovia à direita da direção do tráfego e a linha branca sólida mais próxima, não sendo a linha central, marcada na rodovia",
      "Uma faixa imediatamente ao lado de uma fileira de parquímetros em uma área urbana"
    ],
    correct: 1
  },
  {
    id: 10,
    question: "Verificação do ombro significa:",
    options: [
      "Olhando para o ponto cego na direção em que o motorista pretende se mover",
      "Olhando para o espelho externo esquerdo",
      "Olhando para os espelhos internos e externos",
      "Olhando para o espelho externo direito"
    ],
    correct: 0
  },
  {
    id: 11,
    question: "Este sinal indica:",
    image: "/signs/11.png",
    options: [
      "Instalações off-road à frente",
      "Escorregadio quando molhado",
      "Pavimento irregular",
      "Desvio à frente"
    ],
    correct: 2
  },
  {
    id: 12,
    question: 'Uma luz de controle de faixa de rodagem com um "X" vermelho aceso significa:',
    options: [
      "Prepare-se para um veículo de emergência trafegando nessa faixa",
      "Reduza a velocidade para menos de 30 km/h",
      "Use essa faixa apenas com o propósito de fazer uma conversão à esquerda",
      "A viagem não é permitida nessa pista"
    ],
    correct: 3
  },
  {
    id: 13,
    question: 'Um pai tem o direito de retirar um "consentimento dos pais" dado anteriormente para alguém com menos de 18 anos de idade com relação a uma licença de operador?',
    options: [
      "Sim, desde que a pessoa ainda seja menor de 18 anos e não seja autossustentável ou casada",
      "Sim, desde que ambos os pais concordem verbalmente em retirar o consentimento em um cartório",
      "Não, uma vez administrado, permanece em vigor até que a pessoa atinja os 18 anos de idade",
      "Não, mas outro formulário de consentimento deve ser assinado por ambos os pais após a suspensão da licença"
    ],
    correct: 0
  },
  {
    id: 14,
    question: "Este sinal indica:",
    image: "/signs/14.png",
    options: [
      "Não entre",
      "Veículos de emergência entrando na estrada",
      "A faixa designada está fechada",
      "Passagem de trem"
    ],
    correct: 3
  },
  {
    id: 15,
    question: "Ao estacionar em declive em uma via de mão dupla, o motorista deve:",
    options: [
      "Vire as rodas dianteiras em direção ao meio-fio ou à beira da estrada e acione o freio de estacionamento",
      "Mantenha as rodas dianteiras posicionadas em linha reta e acione o freio de estacionamento",
      "Afaste as rodas dianteiras do meio-fio ou da beira da estrada e acione o freio de estacionamento",
      "Acione apenas o freio de estacionamento"
    ],
    correct: 0
  },
  {
    id: 16,
    question: "Se um motorista estiver sendo seguido por um veículo que esteja tentando ultrapassar em uma via de mão dupla, o motorista deve:",
    options: [
      "Fique na pista e vá para a parte direita da pista",
      "Ligue o sinal direito e dirija na faixa de estacionamento",
      "Ligue o sinal da esquerda e fique na faixa",
      "Permaneça na faixa e vá para a parte esquerda da faixa"
    ],
    correct: 0
  },
  {
    id: 17,
    question: "O procedimento de frenagem recomendado para levar um veículo a uma parada normal e suave é:",
    options: [
      "Aumente continuamente a pressão do freio até que as rodas travem",
      "Aplique pressão no freio, desacelere um pouco antes de o veículo parar e, em seguida, aplique novamente pressão suficiente para parar",
      "Coloque o veículo em ponto morto e aplique pressão constante no pedal do freio até que o veículo pare",
      "Pise no pedal do freio suavemente até que o veículo pare"
    ],
    correct: 1
  },
  {
    id: 18,
    question: "Qual afirmação descreve os passos necessários para reverter em linha reta?",
    options: [
      "Coloque a mão esquerda na parte superior do volante e olhe por cima do ombro direito pela janela traseira",
      "Coloque a mão direita na parte superior do volante, olhe por cima do ombro esquerdo e use o espelho retrovisor externo esquerdo",
      "Coloque a mão esquerda na parte inferior do volante e use os dois espelhos externos",
      "Mantenha as duas mãos no volante e use constantemente o espelho retrovisor interno para orientação"
    ],
    correct: 0
  },
  {
    id: 19,
    question: 'Uma "Zona de Tecelão" é melhor descrita como:',
    options: [
      "Um local em uma rodovia onde as faixas de entrada e saída estão próximas e os veículos que estão desacelerando para sair da rodovia devem dirigir entre os veículos que estão acelerando para entrar na rodovia",
      "Um lugar onde a rodovia tem uma série de curvas que exigem que o motorista diminua a velocidade",
      "Uma área na rodovia que é usada para estacionamento de emergência",
      "Uma área de acesso limitado em uma rodovia onde um motorista pode legalmente dar ré em seu veículo quando perder a saída"
    ],
    correct: 0
  },
  {
    id: 20,
    question: "Quando uma conversão dupla é permitida em um cruzamento?",
    options: [
      "Somente ao virar de uma estrada de mão única para uma estrada de mão única",
      "Sempre que houver pelo menos 2 pistas na estrada sendo inserida",
      "Somente quando indicado por marcações de pavimento ou sinais de controle de tráfego",
      "Somente quando a estrada tiver 6 ou mais faixas"
    ],
    correct: 2
  },
  {
    id: 21,
    question: "Ao se aproximar de uma placa de Yield, você deve:",
    options: [
      "Ceda o direito de passagem ao tráfego que não esteja de frente para o sinal e a todos os pedestres na interseção",
      "Sempre toque a buzina para alertar o tráfego dentro do cruzamento",
      "Espere que todos os outros veículos cedam o direito de passagem para você",
      "Pare e prossiga depois de olhar para a direita e para a esquerda"
    ],
    correct: 0
  },
  {
    id: 22,
    question: 'O termo "dirigir demais" os faróis à noite significa:',
    options: [
      "O motorista não pode ver claramente por 1000 metros",
      "Os faróis baixos não estão ajustados corretamente",
      "O motorista está viajando a uma velocidade que não permitiria ver um objeto a tempo de parar",
      "O motorista manteve os faróis acesos por muito tempo"
    ],
    correct: 2
  },
  {
    id: 23,
    question: "No âmbito do programa de Licenciamento para Motorista Graduado, o motorista receberá 2 deméritos:",
    options: [
      "Por ter mais passageiros do que cintos de segurança",
      "Por não usar o cinto de segurança bem apertado",
      "Por não usar cinto de segurança",
      "Por não usar o cinto de segurança bem ajustado"
    ],
    correct: 0
  },
  {
    id: 24,
    question: "Usando a regra dos 2 segundos para julgar uma distância segura ao dirigir:",
    options: [
      "É mais preciso em rodovias rurais do que em centros urbanos",
      "Não é preciso em velocidades superiores a 100 km/h",
      "É preciso em qualquer velocidade",
      "Não é preciso em velocidades inferiores a 100 km/h"
    ],
    correct: 2
  },
  {
    id: 25,
    question: "Este sinal indica:",
    image: "/signs/25.png",
    options: [
      "Tráfego entrando pela direita",
      "Sinuosa estrada à frente",
      "Curva direita",
      "Cruzamento oculto à direita"
    ],
    correct: 2
  },
  {
    id: 26,
    question: "O motorista que se aproxima de um semáforo vermelho intermitente deve:",
    options: [
      "Pare e espere a luz verde piscando",
      "Reduza a velocidade e prossiga com cautela",
      "Pare e prossiga apenas quando for seguro fazê-lo",
      "Pare até que a luz indicadora fique verde"
    ],
    correct: 2
  },
  {
    id: 27,
    question: "Este sinal indica:",
    image: "/signs/27.png",
    options: [
      "Não entre",
      "Veículos lentos à frente",
      "Aviso, sinal de rendimento à frente",
      "Aviso, o tráfego está se aproximando"
    ],
    correct: 2
  },
  {
    id: 28,
    question: "De acordo com a lei em Alberta, é responsabilidade do motorista garantir que todos os passageiros com menos de que idade estejam devidamente presos no veículo?",
    options: ["18 anos", "24 anos", "21 anos", "16 anos"],
    correct: 3
  },
  {
    id: 29,
    question: "Ao estacionar paralelamente, as rodas do veículo mais próximas ao meio-fio devem estar dentro de qual distância máxima?",
    options: [
      "80 cm do meio-fio",
      "30 cm do meio-fio",
      "10 cm do meio-fio",
      "50 cm do meio-fio"
    ],
    correct: 3
  },
  {
    id: 30,
    question: "Quem é responsável e legalmente obrigado a relatar qualquer condição médica, alteração na saúde ou deficiência física que possa afetar a capacidade de dirigir do motorista?",
    options: [
      "O empregador do motorista",
      "O motorista",
      "Médico do motorista",
      "A seguradora do motorista"
    ],
    correct: 1
  },
  {
    id: 31,
    question: "Quando um veículo é parado para permitir que um pedestre atravesse a via, outros veículos que se aproximam por trás:",
    options: [
      'Pode ultrapassar o veículo parado quando o sinal de passagem para pedestres mudou para "Não ande"',
      "Pode ultrapassar o veículo parado quando o contato visual é feito com o pedestre e o pedestre para",
      "Não deve ultrapassar o veículo parado. É ilegal",
      "Pode ultrapassar o veículo parado se não houver tráfego em sentido contrário que possa impedir a passagem com segurança"
    ],
    correct: 2
  },
  {
    id: 32,
    question: "Salvo permissão em contrário, em que faixa o motorista deve estar para virar à esquerda em uma via de mão única?",
    options: [
      "A faixa central",
      "A faixa mais próxima do meio-fio direito",
      "A faixa da esquerda mais próxima do meio-fio esquerdo",
      "A faixa à direita do centro"
    ],
    correct: 2
  },
  {
    id: 33,
    question: "Quando um motorista está parando atrás de outro veículo no trânsito:",
    options: [
      "Mantenha-se afastado aproximadamente 1 metro do para-choque traseiro do veículo à frente",
      "Deixe espaço suficiente para passar para outra faixa sem dar ré",
      "Mantenha uma distância mínima de 10 metros do veículo à frente",
      "Mantenha espaço suficiente conforme determinado pela regra dos 2 segundos"
    ],
    correct: 1
  },
  {
    id: 34,
    question: "Este sinal indica:",
    image: "/signs/34.png",
    options: [
      "Os veículos podem virar à esquerda ou seguir em frente",
      "Conversões à esquerda são proibidas",
      "Vire à esquerda em pista dupla",
      "Curva acentuada à esquerda na estrada à frente"
    ],
    correct: 2
  },
  {
    id: 35,
    question: "Este sinal indica:",
    image: "/signs/35.png",
    options: [
      "Ceder o direito de passagem para pedestres e tráfego",
      "Placa de veículo de mercadorias perigosas: gás inflamável",
      "Veículo em movimento lento",
      "Aviso, sinal de rendimento à frente"
    ],
    correct: 2
  },
  {
    id: 36,
    question: "Por que não é seguro ultrapassar um caminhão carregado de toras que está virando?",
    options: [
      "O motorista do caminhão precisa se concentrar totalmente na curva e não precisa da responsabilidade adicional de um veículo que está passando",
      "Caminhões de transporte de toras carregados obedecem à regra de 6 segundos para curvas",
      "Existe uma zona de perigo, pois a queda das toras da parte mais alta do caminhão pode bloquear todas as faixas de uma rodovia durante a curva",
      "É ilegal fazê-lo"
    ],
    correct: 2
  },
  {
    id: 37,
    question: "Este sinal indica:",
    image: "/signs/37.png",
    options: [
      "Sinuosa estrada à frente",
      "Mudança de faixa permitida",
      "Escorregadio quando molhado",
      "Zona de tecelagem à frente"
    ],
    correct: 0
  },
  {
    id: 38,
    question: 'Um sinal de "veículo em movimento lento" deve ser exibido na parte traseira de qualquer veículo que normalmente trafegue em velocidades inferiores a:',
    options: ["70 km/h", "50 km/h", "40 km/h", "60 km/h"],
    correct: 2
  },
  {
    id: 39,
    question: "Este sinal indica:",
    image: "/signs/39.png",
    options: [
      "Zona de playground à frente",
      "Travessia de pedestres à frente",
      "Ponto de ônibus escolar à frente",
      "Zona escolar à frente"
    ],
    correct: 2
  },
  {
    id: 40,
    question: "Ao encontrar um cortejo fúnebre que atravessa um cruzamento:",
    options: [
      "Toque a buzina antes de prosseguir",
      "Prossiga com o cortejo fúnebre apenas quando houver espaço suficiente entre os veículos",
      "Ceda o direito de passagem e não interrompa a procissão",
      "Pisque os faróis altos antes de prosseguir"
    ],
    correct: 2
  },
  {
    id: 41,
    question: "Ao trafegar em áreas urbanas, os motoristas devem verificar a estrada aproximadamente:",
    options: [
      "25 a 30 segundos à frente",
      "20 a 30 segundos à frente",
      "12 a 15 segundos à frente",
      "1 a 6 segundos à frente"
    ],
    correct: 2
  },
  {
    id: 42,
    question: "O motorista pode ultrapassar o limite de velocidade ao ultrapassar outro veículo?",
    options: [
      "Sim, apenas em rodovias principais",
      "Não, nunca é permitido",
      "Sim, mas não mais de 10 km/h acima do limite de velocidade",
      "Somente ao ultrapassar mais de um veículo por vez"
    ],
    correct: 1
  },
  {
    id: 43,
    question: "Se os pneus direitos do veículo saírem da parte pavimentada da pista:",
    options: [
      "Aplique os freios com firmeza e contra-direção para retornar à parte pavimentada da estrada",
      "Mantenha um aperto firme no volante, alivie o pedal do acelerador e, em seguida, retorne gradualmente à parte pavimentada da estrada",
      "Acelere ligeiramente e, em seguida, gire o volante bruscamente para retornar à parte pavimentada da estrada",
      "Mova o veículo completamente para fora da parte pavimentada e, em seguida, volte para a parte pavimentada da estrada"
    ],
    correct: 2
  },
  {
    id: 44,
    question: 'No Manual do Motorista da Carteira Básica, "noturno" é definido como o período de tempo:',
    options: [
      "Começando 1 hora antes do pôr do sol e terminando 1 hora após o nascer do sol seguinte",
      "Começando ao pôr do sol e terminando no nascer do sol seguinte",
      "Começando 1 hora após o pôr do sol e terminando 1 hora antes do nascer do sol seguinte",
      "Entre 19:00 e 07:00"
    ],
    correct: 2
  },
  {
    id: 45,
    question: "Uma faixa de desaceleração é:",
    options: [
      "Uma faixa onde os veículos reduzem a velocidade ao sair de uma rodovia",
      "A faixa direita de uma rodovia de quatro pistas para uso por veículos em movimento mais lento",
      "Uma faixa em colinas para uso de veículos em movimento mais lento",
      "A faixa imediatamente à direita de uma linha amarela sólida em uma rodovia"
    ],
    correct: 0
  },
  {
    id: 46,
    question: "Este sinal indica:",
    image: "/signs/46.png",
    options: [
      "Zona escolar",
      "Faixa de pedestres da escola à frente",
      "Zona de parque infantil",
      "Luzes ativadas para pedestres à frente"
    ],
    correct: 1
  },
  {
    id: 47,
    question: "Ao completar um ângulo de estacionamento, a roda dianteira do veículo deve estar dentro de qual distância máxima do meio-fio mais próximo?",
    options: ["100 cm", "50 cm", "25 cm", "75 cm"],
    correct: 1
  },
  {
    id: 48,
    question: "De acordo com o Manual do Motorista da Carteira Básica, a maioria das derrapagens é resultado de:",
    options: ["Erro do motorista", "Pneus ruins", "Freios ruins", "Estradas geladas"],
    correct: 0
  },
  {
    id: 49,
    question: "Em um sinal de parada, o motorista deve:",
    options: [
      "Pare em uma posição onde a visibilidade seja maior",
      "Pare 10 metros antes de uma faixa de pedestres ou linha de parada marcada",
      "Pare na faixa de pedestres marcada ou na linha de parada",
      "Pare antes de entrar em uma faixa de pedestres marcada ou cruzar uma linha de parada"
    ],
    correct: 3
  },
  {
    id: 50,
    question: "O que significa um semáforo amarelo piscando?",
    options: [
      "Prossiga com cuidado",
      "O semáforo ficará verde",
      "Pare até que a luz pare de piscar",
      "O semáforo ficará vermelho"
    ],
    correct: 0
  },
  {
    id: 51,
    question: "Quão perto um motorista pode estacionar legalmente um veículo em um sinal de pare?",
    options: ["1,5 metros", "5 metros", "10 metros", "3 metros"],
    correct: 1
  },
  {
    id: 52,
    question: "Antes de sair de uma vaga de estacionamento paralela à direita de uma estrada:",
    options: [
      "Verificação do ombro para a direita",
      "Ligue o sinal certo",
      "Verificação do ombro à esquerda",
      "Use um sinal de braço para fora e para cima"
    ],
    correct: 2
  },
  {
    id: 53,
    question: "Ao seguir um veículo de emergência com as luzes ou sirene acionadas, mantenha uma distância mínima de:",
    options: ["100 metros", "75 metros", "125 metros", "150 metros"],
    correct: 3
  },
  {
    id: 54,
    question: "Um veículo saindo de um estacionamento para uma estrada:",
    options: [
      "Deve parar apenas se houver um sinal de parada",
      "Não é necessário parar",
      "Deve parar antes de atravessar a calçada somente se houver pedestres presentes",
      "Deve parar completamente"
    ],
    correct: 3
  },
  {
    id: 55,
    question: "Em uma área urbana, quando um pedestre está parado em uma faixa de pedestres com o braço levantado aproximadamente em ângulo reto com o corpo e apontando para o meio-fio oposto, o que isso significa?",
    options: [
      "Motoristas devem parar e ceder ao pedestre",
      "O pedestre é deficiente visual e precisa de ajuda para atravessar a via",
      "Motoristas não precisam ceder ao pedestre até que ele saia do meio-fio",
      "Motoristas devem reduzir a velocidade para 30 km/h e ter cuidado ao ultrapassar o pedestre"
    ],
    correct: 0
  },
  {
    id: 56,
    question: "A que distância mínima os faróis devem ser escurecidos à noite ao se aproximar de outro veículo por trás?",
    options: ["60 metros", "300 metros", "150 metros", "100 metros"],
    correct: 2
  },
  {
    id: 57,
    question: "Este sinal indica:",
    options: [
      "Através da pista apenas",
      "Passagem permitida",
      "Não são permitidas curvas",
      "Tráfego nos dois sentidos"
    ],
    correct: 3
  },
  {
    id: 58,
    question: "No programa de Licenciamento para Motorista Graduado, o aluno com carteira de motorista classe 7 é suspenso quando acumula:",
    options: ["15 deméritos", "12 deméritos", "8 deméritos", "7 deméritos"],
    correct: 2
  },
  {
    id: 59,
    question: "Os sinais de limite de velocidade indicam:",
    options: [
      "A velocidade que você deve viajar sob todas as condições de direção",
      "A velocidade mínima permitida em todas as rodovias",
      "A velocidade máxima permitida quando as condições são favoráveis",
      "A velocidade máxima permitida, exceto ao passar"
    ],
    correct: 2
  },
  {
    id: 60,
    question: 'Um "cruzamento descontrolado":',
    options: [
      "Tem uma luz amarela piscando para uma direção do tráfego e uma luz vermelha piscando para a outra direção do tráfego",
      "Tem sinais de trânsito, mas sem luzes de controle de tráfego",
      "Não tem semáforos de controle de tráfego ou sinais de trânsito",
      "Tem sinais de Yield, mas não sinais de Stop"
    ],
    correct: 2
  },
  {
    id: 61,
    question: "Ao enfrentar um sinal de junção, o motorista deve:",
    options: [
      "Pare na entrada da outra rodovia e espere até que ocorra uma brecha no trânsito antes de prosseguir",
      "Preste atenção a uma lacuna no tráfego na rodovia em que está entrando, ajuste a velocidade da rodovia na faixa de aceleração e misture-se suavemente",
      "Pare e ceda o direito de passagem ao tráfego que já está na rodovia",
      "Reduza a velocidade e prossiga com cautela"
    ],
    correct: 1
  },
  {
    id: 62,
    question: "Em visibilidade reduzida devido a neblina, fumaça ou neve, utilize:",
    options: [
      "Luzes do parque",
      "Faróis em farol alto",
      "Faróis em farol baixo",
      "Luzes diurnas"
    ],
    correct: 2
  },
  {
    id: 63,
    question: "Este sinal indica:",
    image: "/signs/63.png",
    options: [
      "Sinuosa estrada à frente",
      'Interseção "T"',
      "Estrada estreita para a direita",
      "Mesclando tráfego"
    ],
    correct: 3
  },
  {
    id: 64,
    question: 'Quando dois veículos se aproximam de uma interseção em "T" não controlada em ângulos retos aproximadamente ao mesmo tempo:',
    options: [
      "O veículo à esquerda deve ceder o direito de passagem",
      "O veículo à esquerda tem o direito de passagem",
      "O veículo em linha reta sempre tem o direito de passagem",
      "Ambos os veículos devem parar"
    ],
    correct: 0
  },
  {
    id: 65,
    question: "Um motorista pode virar à direita em um semáforo vermelho?",
    options: [
      "Sim, mas apenas quando um sinal permite tal conversão",
      "Sim, se o motorista reduzir a velocidade e não houver trânsito ou pedestre no cruzamento e nenhuma placa que proíba tal conversão",
      "Sim, se o motorista parar e não houver trânsito, pedestre ou sinal que proíba tal conversão",
      "Não, nunca são permitidas curvas à direita em um semáforo vermelho"
    ],
    correct: 2
  },
  {
    id: 66,
    question: "O limite de velocidade em uma zona de construção deve ser obedecido:",
    options: [
      "Apenas durante o dia",
      "Em todos os momentos",
      "Somente quando uma pessoa sinalizadora é postada nas proximidades",
      "Somente quando os trabalhadores da construção estão presentes"
    ],
    correct: 1
  },
  {
    id: 67,
    question: "Este sinal indica:",
    image: "/signs/67.png",
    options: [
      "A faixa é reservada para uso dos veículos especificados",
      "Tráfego de mão única",
      "Somente veículos de carona",
      "A pista pode ser usada para veículos de mercadorias perigosas"
    ],
    correct: 0
  },
  {
    id: 68,
    question: "Quando um apoio de cabeça é levantado para a posição correta, o centro do apoio de cabeça é:",
    options: [
      "Nível com o topo da orelha",
      "Nível com a parte superior dos ombros",
      "Nível com o pescoço",
      "Nivele com o topo da cabeça"
    ],
    correct: 0
  },
  {
    id: 69,
    question: "Uma faixa de aceleração é:",
    options: [
      "A faixa esquerda de uma rodovia de quatro pistas, para uso ao ultrapassar veículos lentos",
      "Uma faixa em colinas, designada para veículos em movimento mais rápido",
      "Uma faixa em uma área de junção para uso de veículos que entram na rodovia",
      "Uma pista com marcações de linhas quebradas"
    ],
    correct: 2
  },
  {
    id: 70,
    question: "As inversões de marcha em áreas urbanas não são permitidas em:",
    options: [
      "Um cruzamento com faixas de tráfego marcadas",
      "Estradas com canteiro central ajardinado",
      "Um cruzamento controlado por um sinal de controle de tráfego",
      "Uma interseção controlada pelos sinais de parada"
    ],
    correct: 2
  },
  {
    id: 71,
    question: "Este sinal indica:",
    image: "/signs/71.png",
    options: [
      "A estrada se estreita, à esquerda",
      "Tráfego nos dois sentidos",
      "Rodovia dividida termina",
      "Obstrução - mantenha-se à esquerda"
    ],
    correct: 0
  },
  {
    id: 72,
    question: "Este sinal indica:",
    image: "/signs/72.png",
    options: [
      "Rumble strips",
      "Área em construção",
      "Ressalto",
      "Pavimento termina"
    ],
    correct: 2
  },
  {
    id: 73,
    question: "De acordo com o programa de Licenciamento para Motorista Graduado, qual é o tempo mínimo que uma pessoa deve servir como motorista probatório Classe 5?",
    options: ["6 meses", "18 meses", "2 anos", "1 ano"],
    correct: 2
  },
  {
    id: 74,
    question: "Um motorista é obrigado a relatar todas as colisões à polícia quando pessoas forem feridas ou mortas, ou quando os danos combinados a todos os veículos ou propriedades forem maiores que:",
    options: ["$750", "$1000", "$250", "$500"],
    correct: 1
  },
  {
    id: 75,
    question: "Se outro veículo estiver muito próximo, o que o motorista deve fazer?",
    options: [
      "Desacelere gradualmente e encoraje o outro veículo a passar",
      "Pressione com força o pedal do freio",
      "Aumente a velocidade para 10 km/h acima do limite de velocidade afixado",
      "Ative os piscas de quatro vias"
    ],
    correct: 0
  },
  {
    id: 76,
    question: "Um motorista tentando virar à esquerda em um semáforo verde estável:",
    options: [
      "Tem o direito de passagem sobre o tráfego que se aproxima",
      "Deve parar antes da linha de pedestres, então prossiga",
      "Tem o direito de passagem sobre os pedestres",
      "Não deve cruzar o caminho de um veículo que se aproxima, a menos que seja seguro"
    ],
    correct: 3
  },
  {
    id: 77,
    question: "Um teste de estrada será recusado por um examinador de motorista se:",
    options: [
      "O veículo tem uma capacidade de assentos superior a 7",
      "O veículo está registrado como um veículo agrícola",
      "O veículo é um veículo alugado",
      "O veículo não é mecanicamente seguro"
    ],
    correct: 3
  },
  {
    id: 78,
    question: "Este sinal indica:",
    image: "/signs/78.png",
    options: [
      "Crianças brincando em área residencial",
      "Faixa de pedestres à frente",
      "Área escolar",
      "Zona de parque infantil"
    ],
    correct: 1
  },
  {
    id: 79,
    question: "Ao ultrapassar um caminhão grande em uma rodovia de mão dupla, o motorista deve:",
    options: [
      "Retorne à faixa quando o caminhão não estiver mais visível em nenhum dos espelhos retrovisores",
      "Retorne à faixa deles depois de passar pelo para-choque dianteiro do caminhão",
      "Retorne à faixa quando sinalizado pelos faróis do caminhão",
      "Deixe espaço extra antes de retornar à pista"
    ],
    correct: 3
  },
  {
    id: 80,
    question: "Em um veículo que não possui freios ABS, a frenagem limite refere-se a:",
    options: [
      "Aplicando uma força de frenagem uniforme até o ponto imediatamente antes do travamento das rodas e diminuindo levemente se as rodas travarem",
      "Pisar no pedal do freio repetidamente até que o veículo pare",
      "Liberando a pressão no pedal do freio e reaplicando a pressão até que as rodas travem",
      "Aplicar força suficiente no pedal do freio para travar as rodas e mantê-las travadas"
    ],
    correct: 0
  },
  {
    id: 81,
    question: "Quando o veículo do condutor for abordado por um veículo de emergência que acione a sirene, vindo de qualquer direção em via de mão dupla, o condutor deve:",
    options: [
      "Continue a uma velocidade reduzida e deixe espaço suficiente para a passagem do veículo de emergência",
      "Ligue suas luzes de perigo de quatro vias",
      "Pare apenas quando o veículo de emergência tiver dificuldade em passar",
      "Dirija o mais próximo possível do meio-fio ou da beira da estrada à direita e pare"
    ],
    correct: 0
  },
  {
    id: 82,
    question: "Em Alberta, a lei exige o uso de cintos de segurança:",
    options: [
      "Somente durante o transporte de passageiros",
      "Adequadamente em todos os momentos",
      "Somente ao dirigir em velocidades de rodovia",
      "Somente ao dirigir na cidade"
    ],
    correct: 1
  },
  {
    id: 83,
    question: "Este sinal indica:",
    image: "/signs/83.png",
    options: [
      "Somente caminhões pesados",
      "Não passe",
      "Nenhum veículo permitido",
      "Não entre"
    ],
    correct: 1
  },
  {
    id: 84,
    question: "Um motorista entrando em uma rotatória:",
    options: [
      "Deve ceder ao tráfego à direita",
      "Deve ceder aos veículos na rotatória",
      "Tem o direito de passagem",
      "Deve usar a regra de cortesia e ceder ao veículo que chegou primeiro"
    ],
    correct: 1
  },
  {
    id: 85,
    question: "Ao virar à esquerda de uma via de mão dupla para uma via de mão única, em qual faixa o veículo deve entrar?",
    options: [
      "A faixa imediatamente à direita do centro",
      "A faixa mais próxima do meio-fio no lado esquerdo da via de mão única",
      "A faixa central da estrada de sentido único",
      "A faixa da direita da estrada de mão única"
    ],
    correct: 1
  },
  {
    id: 86,
    question: "Em que direção as rodas dianteiras de um veículo devem ser viradas quando estacionado em uma ladeira em uma via de mão dupla com meio-fio?",
    options: [
      "Paralelo ao meio-fio",
      "Para a esquerda",
      "Direto",
      "À direita"
    ],
    correct: 3
  },
  {
    id: 87,
    question: "Este sinal indica:",
    image: "/signs/87.png",
    options: [
      "Pavimento termina",
      "Área em construção",
      "Fim da linha",
      "Marcador de perigo"
    ],
    correct: 2
  },
  {
    id: 88,
    question: "Verificação do ombro significa:",
    options: [
      "Olhando para o espelho externo direito",
      "Olhando para o espelho externo esquerdo",
      "Olhando para o ponto cego na direção em que o motorista pretende se mover",
      "Olhando para os espelhos interno e externo"
    ],
    correct: 2
  },
  {
    id: 89,
    question: "Este sinal indica:",
    image: "/signs/89.png",
    options: [
      "Rodovia dividida termina",
      "Rodovia dividida começa",
      "Obstrução – passar à esquerda",
      "Tráfego nos dois sentidos"
    ],
    correct: 1
  },
  {
    id: 90,
    question: "Usando a regra dos 2 segundos para julgar uma distância segura ao dirigir:",
    options: [
      "Não é preciso em velocidades superiores a 100 km/h",
      "É mais preciso em rodovias rurais do que em centros urbanos",
      "Não é preciso em velocidades inferiores a 30 km/h",
      "É preciso em qualquer velocidade"
    ],
    correct: 3
  },
  {
    id: 91,
    question: "Ao se aproximar de um cruzamento com um semáforo amarelo constante:",
    options: [
      "Prossiga, pois o semáforo está prestes a ficar verde",
      "Dê preferência aos veículos da direita",
      "Pare antes do cruzamento, a menos que a parada não possa ser feita com segurança",
      "Aumente a velocidade para limpar a interseção"
    ],
    correct: 2
  },
  {
    id: 92,
    question: "Uma linha amarela sólida junto com a linha amarela tracejada marcada no centro de uma rodovia significa:",
    options: [
      "A estrada se estreita à frente",
      "Se a linha sólida estiver do seu lado, a ultrapassagem é permitida",
      "Se a linha quebrada estiver do seu lado, não é permitido passar",
      "Se a linha quebrada estiver do seu lado, a passagem é permitida"
    ],
    correct: 3
  },
  {
    id: 93,
    question: "Às 9:00 da manhã em um dia de aula, qual é a velocidade máxima permitida em uma zona escolar em uma área rural, a menos que seja postado de outra forma?",
    options: ["50 km/h", "20 km/h", "40 km/h", "30 km/h"],
    correct: 3
  },
  {
    id: 94,
    question: "Em uma rodovia de pista dupla, ao ultrapassar outros veículos que trafegam no mesmo sentido, o motorista:",
    options: [
      "Deve passar à esquerda quando seguro",
      "Deve passar à direita quando seguro",
      "Deve sempre viajar 30 km/h mais rápido que o veículo que está sendo ultrapassado",
      "Não deve arrancar para ultrapassar até estar a 3 metros do veículo que está a ser ultrapassado"
    ],
    correct: 0
  },
  {
    id: 95,
    question: "É permitido estacionar em lugar reservado a pessoas com deficiência:",
    options: [
      "Enquanto o motorista está esperando no veículo",
      "Quando o veículo tiver uma placa de identificação ou placa de licença adequada",
      "Quando todos os outros lugares de estacionamento estiverem preenchidos",
      "Quando o condutor pára menos de 5 minutos"
    ],
    correct: 1
  },
  {
    id: 96,
    question: "Este sinal indica:",
    image: "/signs/96.png",
    options: [
      "Instalações fora de estrada",
      "Serviços hospitalares",
      "Serviços hoteleiros",
      "Marcador de rota principal da rodovia"
    ],
    correct: 1
  },
  {
    id: 97,
    question: "A que distância mínima de um hidrante um veículo deve ser estacionado?",
    options: ["3 metros", "4 metros", "2 metros", "5 metros"],
    correct: 3
  },
  {
    id: 98,
    question: "Este sinal indica:",
    image: "/signs/98.png",
    options: [
      "Sinal de construção, sinalizar pessoa à frente",
      "Sinal de construção, desvio à frente",
      "Cuidado, pedra caindo à frente",
      "Sinal de construção, pessoas trabalhando à frente"
    ],
    correct: 3
  },
  {
    id: 99,
    question: "Ao dirigir na faixa da direita em uma rodovia, o que o motorista deve fazer se outro veículo tentar sair de uma faixa de aceleração à direita?",
    options: [
      "Mude para a faixa da esquerda, se for seguro fazê-lo, ou esteja preparado para ajustar a velocidade",
      "Pare para permitir que o outro veículo entre",
      "Acelere para fechar qualquer lacuna no fluxo de tráfego",
      "Insista para que o outro veículo ceda o direito de passagem"
    ],
    correct: 0
  },
  {
    id: 100,
    question: "Ao se aproximar da retaguarda de um ônibus escolar que está exibindo luzes amarelas intermitentes alternadas, o motorista deve:",
    options: [
      "Esteja preparado para parar, pois este é um aviso de que as luzes vermelhas intermitentes alternadas acenderão assim que o ônibus parar",
      "Pare imediatamente porque o ônibus escolar está carregando ou descarregando alunos",
      "Esteja preparado para parar, pois isso pode ser um aviso de que há uma colisão à frente e o fluxo de tráfego foi interrompido",
      "Tenha cuidado, pois o ônibus escolar está se aproximando de um cruzamento ferroviário e está prestes a parar"
    ],
    correct: 0
  },
  {
    id: 101,
    question: "Salvo indicação em contrário, os limites de velocidade da zona escolar estão em vigor nos dias letivos durante as seguintes horas:",
    options: [
      "8h00 às 16h30",
      "8h30 às 9h30, 12h00 às 13h00 e 15h30 às 16h00",
      "8h00 às 9h30, 11h30 às 13h30 e 15h00 às 16h30",
      "8h30 a 1 hora após o pôr do sol"
    ],
    correct: 2
  },
  {
    id: 102,
    question: "As zonas de playground estão em vigor:",
    options: [
      "Das 8h30 até 1 hora após o pôr do sol",
      "Somente quando as aulas terminam ao meio-dia e depois das 16h30",
      "Durante o dia e até às 23h00",
      "Das 8h00 às 20h00"
    ],
    correct: 0
  },
  {
    id: 103,
    question: "Salvo permissão em contrário, em que faixa um motorista deve estar para virar à esquerda em uma estrada de mão única?",
    options: [
      "A faixa à direita do centro",
      "A faixa da esquerda mais próxima do meio-fio esquerdo",
      "A faixa mais próxima do meio-fio direito",
      "A faixa central"
    ],
    correct: 1
  },
  {
    id: 104,
    question: "Este sinal indica:",
    image: "/signs/104.png",
    options: [
      "Fim da faixa, perda da faixa da direita",
      "Faixa adicionada (fluxo livre)",
      "Curva direita",
      "Pista dupla à frente"
    ],
    correct: 0
  },
  {
    id: 105,
    question: "De acordo com o programa de Licenciamento para Motorista Graduado, um aluno com uma licença Classe 7 não tem permissão para dirigir um veículo entre as horas de:",
    options: [
      "9h00 e 17h00",
      "Meia-noite e 5:00 da manhã",
      "22:00 e 06:00",
      "Meia-noite e 7:00 da manhã"
    ],
    correct: 1
  },
  {
    id: 106,
    question: "Ao se aproximar de um cruzamento e se deparar com um semáforo que mostra uma seta verde para virar à direita e um sinal vermelho, o motorista:",
    options: [
      "Deve parar e esperar por uma luz verde antes de virar na direção da seta",
      "Pode prosseguir quando seguro, sem parar, na direção da seta",
      "Pode passar direto pelo cruzamento sem parar",
      "Pode virar à esquerda sem parar"
    ],
    correct: 1
  },
  {
    id: 107,
    question: "Este sinal indica:",
    image: "/signs/107.png",
    options: [
      "Zona de parque infantil",
      "Faixa de pedestre",
      "Parada de ônibus escolar designada",
      "Zona escolar"
    ],
    correct: 1
  },
  {
    id: 108,
    question: "Ao recuperar de uma derrapagem, o condutor deve:",
    options: [
      "Acelere e dirija na direção oposta da derrapagem",
      "Freie e segure firme no volante",
      "Dirija na direção que o motorista deseja que a frente do veículo vá",
      "Freio e contra-direção"
    ],
    correct: 2
  },
  {
    id: 109,
    question: "Ao se aproximar da retaguarda de um ônibus escolar parado que tenha suas luzes vermelhas piscando alternadamente ativadas, o motorista deve:",
    options: [
      "Toque a buzina para alertar qualquer pedestre e ultrapasse em baixa velocidade",
      "Pare atrás do ônibus e espere até que as luzes vermelhas alternadas parem de piscar",
      "Mude para a faixa da esquerda, reduza a velocidade para 30 km/h e ultrapasse com cautela",
      "Pare atrás do ônibus, olhe atentamente para os pedestres e, se estiver livre, dirija e ultrapasse o ônibus lentamente"
    ],
    correct: 1
  },
  {
    id: 110,
    question: "Este sinal indica:",
    image: "/signs/110.png",
    options: [
      "Cruzamento T",
      "Faixa de tráfego termina",
      "Interseção oculta",
      "Caminhões entrando na rodovia à frente"
    ],
    correct: 0
  },
  {
    id: 111,
    question: "Ao se aproximar do topo de uma colina em uma rodovia de duas pistas:",
    options: [
      "Exceder o limite de velocidade é permitido",
      "Piscar os faróis para avisar os veículos que se aproximam",
      "Fique à direita da pista",
      "Mantenha-se próximo à linha central para evitar que outros passem"
    ],
    correct: 2
  }
];

export function getRandomQuestions(count = 30) {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default ALL_QUESTIONS;