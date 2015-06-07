# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.extract!(@board, :id, :title)
json.members @board.members do |member|
  json.name member.id
  json.email member.email
end
json.lists do
  json.array!(@board.lists) do |list|
    json.extract!(list, *List.column_names)
    json.cards do
      json.array! list.cards
    end
  end
end
