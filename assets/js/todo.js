let sampleListItems = [
	'Go to the grocery',
	'Buy a birthday present for Mom',
	'Prepare dinner',
	'Write thank you notes',
	'Make a todo list',
	'Complete a task on todo list',
	'Take a nap',
	'Clean the house',
	'Wash the car',
	'Mow the lawn',
]
$(function() {
	$ITEM_TEMPLATE = $('.item-template');
	$LIST = $('#list');
	$LIST.on('focusout', function() {
    $(this).find('.details').removeAttr('contenteditable').removeClass('editing');
  })
	let items = retrieveSavedListItems();
	console.log(items);
	for (let id in items) {
		addItem(id, items[id]);
	}
})

function addItem(itemID = generateId(), itemText = randomListItem()) {
	$ITEM_TEMPLATE.clone()
		.attr('class', 'item')
		.appendTo($LIST);
	$('.item').last()
						.attr('id', itemID)
						.find('.details').text(itemText);
}

function generateId(length = 8) {
  let randomString = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++)
    randomString += chars.charAt(Math.floor(Math.random() * chars.length));
  return randomString;
}

function randomListItem() {
	return sampleListItems[Math.floor(Math.random()*sampleListItems.length)]
}

function retrieveSavedListItems() {
	return JSON.parse(localStorage.getItem('todoList'));
}

function makeItemEditable(el) {
	let $itemDetails = $(el).siblings('.details');
	$itemDetails.attr('contenteditable', 'true').addClass('editing');
	$itemDetails.trigger('focus');
}

// function makeListSortable() {
// 	$LIST.addClass('sortable');
// 	$(".sortable").sortable();
// }

function saveList() {
	let listItems = {};
	$('.item').each(function() {
		$item = $(this);
		details = $item.find('.details').text();
		listItems[$item.attr('id')] = details;
	});
	localStorage.setItem('todoList', JSON.stringify(listItems));
}

function trashItem(el) {
	id = '#' + $(el).attr('id');
	itemToRemove = $(id);
	itemToRemove.remove();
}

function clearList() {
	$('.item').each(function() {
		trashItem(this);
	});
}
