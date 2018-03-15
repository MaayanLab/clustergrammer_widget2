- My notes 3-14-2018

## https://stackoverflow.com/questions/45207128/failed-to-upload-packages-to-pypi-410-gone

Upgrade to the very latest pip and setuptools; install twine:

pip install -U pip setuptools twine
Edit ~/.pypirc and comment out or remove repository:

[pypi]
#repository:https://pypi.python.org/pypi
Use twine to upload your module to pypi from within the folder containing the module source, setup.py, and other files:

python setup.py sdist
twine upload dist/*
See https://packaging.python.org/guides/migrating-to-pypi-org/#uploading


- To release a new version of clustergrammer_widget2 on PyPI:

Update _version.py (set release version, remove 'dev')
git add the _version.py file and git commit
`python setup.py sdist upload`
`python setup.py bdist_wheel upload`
`git tag -a X.X.X -m 'comment'`
Update _version.py (add 'dev' and increment minor)
git add and git commit
git push
git push --tags

- To release a new version of clustergrammer_widget2 on NPM:

```
# clean out the `dist` and `node_modules` directories
git clean -fdx
npm install
npm publish
```