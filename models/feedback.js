var mongoose = require('mongoose');

var feedbackSchema = mongoose.Schema({
  user: String,
  feedback: {
    effectiveness : [
      { text: {type: String, default: 'allow me to finish tasks more quickly'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'make it easier to do my job'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'save time when I use it'},
        checked: {type: Boolean, default: false}
      }
    ],
    efficiency: [
      { text: {type: String, default: 'enhance my effectiveness in work'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'do everything I would expect it to do'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'help me be more productive'},
        checked: {type: Boolean, default: false}
      }
    ],
    engaging: [
      { text: {type: String, default: 'provides familiar dev environment'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'looks pleasing'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'layout is not complicated'},
        checked: {type: Boolean, default: false}
      }
    ],
    ease: [
      { text: {type: String, default: 'provides easy to access documentation'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'flexible to interact with'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'designed for all levels of user'},
        checked: {type: Boolean, default: false}
      }
    ],
    tolerant: [
      { text: {type: String, default: 'diagnoses the source and cause of error'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'provides revision control'},
        checked: {type: Boolean, default: false}
      },
      { text: {type: String, default: 'makes it difficult to commit errors'},
        checked: {type: Boolean, default: false}
      }
    ]
  }
    
});

module.exports = mongoose.model('Feedback', feedbackSchema);
