/* Description:
 *  <insert description>
 *
 *  Author:
 *    koddsson, stebbib
 */

var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var Promise = require('es6-promise').Promise;

var dagskammtur = require('node-dagskammtur');

console.log(path.join(__dirname, 'template.html'));

var base_template = fs.readFileSync(path.join(__dirname, 'template.html')).toString();
var item_template = '<h2>{{ day }}</h2><ul><li>{{ items }}</li></ul>';

module.exports = function(corsica) {
  return new Promise(function(resolve, reject) {
    corsica.on('dagskammtur', function(msg) {
      dagskammtur(function(data) {
        var html = '';
        _.map(data, function(element) {
          html += item_template
            .replace('{{ day }}', element.weekday.toString('utf8'))
            .replace('{{ items }}', element.menu_items.join('</li><li>'));
        });
        corsica.sendMessage('content', {
          type: 'html',
          screen: msg.screen,
          content: base_template.replace('{{ content }}', html)
        });
      });
    });
  });
};
