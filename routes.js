module.exports = [
  {
    name: 'index'
  },
  {
    name: 'pizzicato'
  },
  {
    name: 'main',
    children: [
      {
        name: 'tel'
      },
      {
        name: 'tel2'
      }
    ]
  },
  {
    name: 'news',
    layout: 'news',
    children: [
      {
        name: 'tel'
      },
      {
        name: 'tel2',
        layout: 'default'
      }
    ]
  }
]