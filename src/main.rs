extern crate notify;
use notify::{Watcher,RecursiveMode,watcher,DebouncedEvent};

use std::{sync::mpsc::channel};
use std::time::Duration;
use std::fs::copy;
use std::fs::File;
use std::path::{Path, PathBuf};



pub fn main() {
    let (tx,rx) = channel();

    let mut watcher = watcher(tx,Duration::from_secs(10)).unwrap();

    // watcher.watch("H:\\Work\\framework\\NoteBook",RecursiveMode::NonRecursive).unwrap();
    watcher.watch("G:\\Feature film",RecursiveMode::NonRecursive).unwrap();

    // Create Rename Remove Write
    loop {
        match rx.recv() {
            // Ok(event) => println!("{:?}",event),
            Ok(event) =>{ 
                println!("{:?}",event);
                // match event { // match 的返回值类型必须相同
                //     DebouncedEvent::Create(a)=> copyfile(&a),
                //     DebouncedEvent::Rename(_a,b)=> copyfile(&b),
                //     DebouncedEvent::Remove(a)=> copyfile(&a),
                //     DebouncedEvent::Write(a)=> copyfile(&a),
                //     _=>(),
                // };
            },
            Err(e)=> println!("watch error: {:?}",e)
        }
    }
}

#[allow(dead_code)]
fn copyfile(a:&PathBuf){
    let filename =a.file_name().unwrap();
    let savepath =   Path::new("H:\\Work\\Site\\content").join(filename);
    println!("{:?}",savepath);
    if savepath.exists() {
        copy(a,savepath).unwrap();
    }
    else{
        File::create(&savepath).unwrap();
        copy(a,savepath).unwrap();
    }
}