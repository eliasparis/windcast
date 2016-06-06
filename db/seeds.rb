# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Video.create([
	{title: "SUPER FINAL Amado Vrieswijk - PWA World Cup Austria 2016 - YouTube",url: "https://www.youtube.com/watch?v=-CJ_U3Wy-Wk" ,media_id: "-CJ_U3Wy-Wk"  ,provider: "youtube", publication_date: Date.new(2017,06,06)},
	{title: "PWA PODERSDORF 2016 DAY1 - YouTube",url: "https://www.youtube.com/watch?v=hm1D7dQk0f4" ,media_id:  "hm1D7dQk0f4",provider: "youtube", publication_date: Date.new(2016,05,06)},
	{title: "Ulsan PWA World Cup 2016 highlights day 4",url: "https://www.youtube.com/watch?v=y2GJ5lrs9Rc" ,media_id: "y2GJ5lrs9Rc" ,provider: "youtube", publication_date: Date.new(2016,03,03)},
	{title: "PWA World Cup Ulsan 2016 : Day 4",url: "https://www.youtube.com/watch?v=vRaPMwUc7NM",media_id: "vRaPMwUc7NM",provider: "youtube", publication_date: Date.new(2016,07,07)},
	{title: "NB 61 Kiri Thode 2016 Part1",url: "https://www.youtube.com/watch?v=WomhHJvf64E",media_id:  "WomhHJvf64E",provider: "youtube", publication_date: Date.new(2016,02,02)}
])