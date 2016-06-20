# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160620100614) do

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.integer  "video_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tags", ["video_id"], name: "index_tags_on_video_id"

  create_table "tags_videos", id: false, force: :cascade do |t|
    t.integer "video_id", null: false
    t.integer "tag_id",   null: false
  end

  create_table "videos", force: :cascade do |t|
    t.string   "title"
    t.string   "url"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "media_id"
    t.string   "provider"
    t.date     "publication_date"
    t.string   "thumbnail"
    t.string   "author"
    t.string   "author_url"
  end

  create_table "videotags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "video_id"
    t.integer  "tag_id"
  end

end
