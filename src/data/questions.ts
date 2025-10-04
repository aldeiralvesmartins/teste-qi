export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: 'logic' | 'verbal' | 'visual' | 'numeric'
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Qual número completa a sequência: 2, 4, 8, 16, ?",
    options: ["20", "24", "32", "64"],
    correctAnswer: 2,
    category: 'numeric'
  },
  {
    id: 2,
    question: "Livro está para Leitura assim como Garfo está para:",
    options: ["Cozinha", "Comida", "Prato", "Faca"],
    correctAnswer: 1,
    category: 'verbal'
  },
  {
    id: 3,
    question: "Se 5 máquinas fazem 5 produtos em 5 minutos, quantas máquinas são necessárias para fazer 100 produtos em 100 minutos?",
    options: ["5", "20", "25", "100"],
    correctAnswer: 0,
    category: 'logic'
  },
  {
    id: 4,
    question: "Qual palavra não pertence ao grupo: Maçã, Banana, Cenoura, Laranja?",
    options: ["Maçã", "Banana", "Cenoura", "Laranja"],
    correctAnswer: 2,
    category: 'verbal'
  },
  {
    id: 5,
    question: "Qual número completa: 1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "14"],
    correctAnswer: 2,
    category: 'numeric'
  },
  {
    id: 6,
    question: "Um trem viaja 60 km em 1 hora. Quantos quilômetros percorrerá em 3 horas e 30 minutos?",
    options: ["180 km", "200 km", "210 km", "240 km"],
    correctAnswer: 2,
    category: 'numeric'
  },
  {
    id: 7,
    question: "Otimista está para Pessimista assim como Generoso está para:",
    options: ["Rico", "Egoísta", "Bondoso", "Pobre"],
    correctAnswer: 1,
    category: 'verbal'
  },
  {
    id: 8,
    question: "Se todos os A são B, e alguns B são C, qual afirmação é verdadeira?",
    options: ["Todos os A são C", "Alguns A podem ser C", "Nenhum A é C", "Todos os C são A"],
    correctAnswer: 1,
    category: 'logic'
  },
  {
    id: 9,
    question: "Qual padrão completa a sequência: A1, C3, E5, G7, ?",
    options: ["H8", "I9", "I8", "H9"],
    correctAnswer: 1,
    category: 'visual'
  },
  {
    id: 10,
    question: "12 é para 3 assim como 20 é para:",
    options: ["4", "5", "6", "10"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 11,
    question: "Qual número não pertence à série: 2, 3, 5, 7, 11, 12, 13?",
    options: ["2", "7", "12", "13"],
    correctAnswer: 2,
    category: 'numeric'
  },
  {
    id: 12,
    question: "Se ontem era dois dias antes de quinta-feira, que dia será amanhã?",
    options: ["Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    correctAnswer: 3,
    category: 'logic'
  },
  {
    id: 13,
    question: "Advogado está para Cliente assim como Médico está para:",
    options: ["Hospital", "Doença", "Paciente", "Remédio"],
    correctAnswer: 2,
    category: 'verbal'
  },
  {
    id: 14,
    question: "Qual número completa a sequência: 100, 50, 25, 12.5, ?",
    options: ["6", "6.25", "5", "7.5"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 15,
    question: "Um carro percorre a primeira metade de uma viagem a 30 km/h e a segunda metade a 60 km/h. Qual a velocidade média?",
    options: ["40 km/h", "45 km/h", "50 km/h", "55 km/h"],
    correctAnswer: 0,
    category: 'numeric'
  },
  {
    id: 16,
    question: "Qual figura é diferente? Círculo, Quadrado, Triângulo, Retângulo, Verde",
    options: ["Círculo", "Quadrado", "Triângulo", "Verde"],
    correctAnswer: 3,
    category: 'visual'
  },
  {
    id: 17,
    question: "Se código é DPEJHP, qual seria PALAVRA?",
    options: ["QBMBWSB", "QBMBwsb", "QBMAWSB", "QBMBXSB"],
    correctAnswer: 0,
    category: 'logic'
  },
  {
    id: 18,
    question: "Qual número vem a seguir: 3, 7, 15, 31, ?",
    options: ["47", "55", "63", "71"],
    correctAnswer: 2,
    category: 'numeric'
  },
  {
    id: 19,
    question: "Mar está para Água assim como Deserto está para:",
    options: ["Areia", "Camelo", "Calor", "Seco"],
    correctAnswer: 0,
    category: 'verbal'
  },
  {
    id: 20,
    question: "Uma dúzia de bananas custa R$12. Quanto custam 5 bananas?",
    options: ["R$4", "R$5", "R$6", "R$10"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 21,
    question: "Se é verdade que alguns gatos não têm pelos, e todos os gatos são animais, então:",
    options: ["Todos animais não têm pelos", "Alguns animais não têm pelos", "Nenhum animal tem pelos", "Gatos não são animais"],
    correctAnswer: 1,
    category: 'logic'
  },
  {
    id: 22,
    question: "Qual número completa: 144, 121, 100, 81, ?",
    options: ["64", "70", "72", "60"],
    correctAnswer: 0,
    category: 'numeric'
  },
  {
    id: 23,
    question: "Rico está para Pobre assim como Alto está para:",
    options: ["Baixo", "Pequeno", "Magro", "Fraco"],
    correctAnswer: 0,
    category: 'verbal'
  },
  {
    id: 24,
    question: "Um relógio marca 3:15. Qual é o menor ângulo entre os ponteiros?",
    options: ["0°", "7.5°", "15°", "30°"],
    correctAnswer: 1,
    category: 'numeric'
  },
  {
    id: 25,
    question: "Qual padrão: AB, CD, EF, GH, ?",
    options: ["IJ", "IK", "HI", "JK"],
    correctAnswer: 0,
    category: 'visual'
  },
  {
    id: 26,
    question: "Se 2 + 3 = 10 e 3 + 4 = 21, quanto é 4 + 5?",
    options: ["20", "30", "36", "45"],
    correctAnswer: 2,
    category: 'logic'
  },
  {
    id: 27,
    question: "Qual número é diferente: 121, 144, 169, 180, 196?",
    options: ["121", "144", "180", "196"],
    correctAnswer: 2,
    category: 'numeric'
  },
  {
    id: 28,
    question: "Telescópio está para Estrelas assim como Microscópio está para:",
    options: ["Lente", "Laboratório", "Bactérias", "Vidro"],
    correctAnswer: 2,
    category: 'verbal'
  },
  {
    id: 29,
    question: "Se todos os dias úteis são dias de trabalho, e hoje é sábado, então:",
    options: ["Hoje é dia útil", "Hoje não é dia de trabalho necessariamente", "Hoje é feriado", "Amanhã é segunda"],
    correctAnswer: 1,
    category: 'logic'
  },
  {
    id: 30,
    question: "Qual número completa: 1, 4, 9, 16, 25, ?",
    options: ["30", "35", "36", "49"],
    correctAnswer: 2,
    category: 'numeric'
  },
  {
    id: 31,
    question: "Começar está para Terminar assim como Entrada está para:",
    options: ["Porta", "Saída", "Casa", "Chegar"],
    correctAnswer: 1,
    category: 'verbal'
  },
  {
    id: 32,
    question: "Um produto custa R$100. Com 20% de desconto e depois 10% de acréscimo, qual o preço final?",
    options: ["R$88", "R$90", "R$92", "R$100"],
    correctAnswer: 0,
    category: 'numeric'
  },
  {
    id: 33,
    question: "Se é impossível que todos os A sejam B, qual afirmação está correta?",
    options: ["Nenhum A é B", "Alguns A não são B", "Todos os B são A", "Pelo menos um A não é B"],
    correctAnswer: 3,
    category: 'logic'
  }
]
