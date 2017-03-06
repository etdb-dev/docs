# etdb-docs

Submodule, creating documentation of parent project.

## Example (etdb-dev/api-server)

You'll probably have to adjust your .gitignore.  
Adding the submodule will fail, if the target directory is being ignored.  

### Paths
```bash
project_root="/projects/api-server"
docs="$project_root/docs"
docs_output="$docs/output"
```

### Add and install submodule
```bash
$ cd $project_root
$ git submodule add github:etdb-dev/docs.git $docs
$ git add $docs
$ git commit -m "Add: submodule docs/"
$ cd $docs
$ npm i
```

### Adjust config to your needs

### Run tasks

The generated files' destination will be `$docs_output/$taskname`

`$ gulp ...`

|  task   |  job                       |  depends             |
|---------|----------------------------|----------------------|
| default | run all tasks              | clean, apidoc, jsdoc |
| apidoc  | generate API documentation | clean                |
| jsdoc   | generate JSDocs            | clean                |
| clean   | rm -rf output/             |                      |
