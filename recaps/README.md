# Recap app

## How to run:
```
cd recaps/
pip install -r requirements.txt
mkdir statics
cd statics
mkdir Images
mkdir model
cd ../
python create_db.py
```

Paste file *cc.vi.300.bin* , *Flickr8k.token.txt* ; Folder *Image_captioning* , *Image_emotion* to *statics/model*

## API:

Listen on : http://127.0.0.1:5000

## Database:

> Config username:password@host/db_name at backend/model.py

> Create Database **db_name** in mariadb first
