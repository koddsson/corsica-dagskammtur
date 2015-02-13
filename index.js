/* Description:
 *  <insert description>
 *
 *  Author:
 *    koddsson, stebbib
 */

var _ = require('lodash');
var dagskammtur = require('../node-dagskammtur');
var Promise = require('es6-promise').Promise;

var template = _.template('<h2><%= day %></h2><ul><li><%= items %></li></ul>');

module.exports = function(corsica) {
  return new Promise(function(resolve, reject) {
    corsica.on('dagskammtur', function(msg) {
      dagskammtur(function(data) {
        var html = '';
        _.map(data, function(element) {
          html += template({ day: element.weekday, items: element.menu_items.join('</li><li>') });
        });
        corsica.sendMessage('content', {
          type: 'html',
          screen: msg.screen,
          content: html
        });
      });
    });
  });
};
