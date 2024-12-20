// noinspection JSUnusedGlobalSymbols,JSUnresolvedReference

document.addEventListener('alpine:init', () => {
    Alpine.data('disabled_when_dirty_action', () => ({
        savedDataHash: null,
        ignoredPaths: [],
        setup(ignoredPaths) {
            this.ignoredPaths = ignoredPaths;
            this.savedDataHash = this.hash(this.$wire.data);

            Livewire.hook('commit', ({commit, succeed}) => {
                commit.calls.forEach(data => {
                    if (data.method === 'save') {
                        succeed(({effects}) => {
                            if (effects.dispatches.filter(dispatched => dispatched.name === 'form-validation-error').length > 0) {
                                return;
                            }

                            this.savedDataHash = this.hash(this.$wire.data);
                        })
                    }
                })
            })
        },
        hash(data) {
            data = JSON.parse(JSON.stringify(data))

            console.debug('before', data)

            for (const ignored of this.ignoredPaths) {
                const piecesToIgnore = ignored.split('.')
                data = this.cleanData(data, piecesToIgnore)
            }

            console.debug('after', data)

            return window.jsMd5(JSON.stringify(data).replace(/"/g, ''))
        },
        cleanData(data, piecesToIgnore) {

            const currentPiece = piecesToIgnore.shift()

            if(currentPiece === undefined){
                return null;
            }

            console.log(data, currentPiece, piecesToIgnore)

            if(currentPiece === '*'){
                for (const dataKey in data) {
                    data[dataKey] =this.cleanData(data[dataKey], piecesToIgnore)
                }

                return data;
            }

            data[currentPiece] = this.cleanData(data[currentPiece], piecesToIgnore)
            return data;
        },
        changed() {
            return this.savedDataHash !== this.hash(this.$wire.data);
        }
    }))
})
