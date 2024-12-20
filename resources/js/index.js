// noinspection JSUnusedGlobalSymbols,JSUnresolvedReference

document.addEventListener('alpine:init', () => {
    Alpine.data('disabled_when_dirty_action', () => ({
        saved_data: null,
        init(){
            this.saved_data = this.hash($wire.data);

            Livewire.hook('commit', ({commit, succeed}) => {
                commit.calls.forEach(data => {
                    if(data.method === 'save'){
                        succeed(({effects}) => {
                            if(effects.dispatches.filter(dispatched => dispatched.name === 'form-validation-error').length > 0){
                                return;
                            }

                            this.saved_data = this.hash($wire.data)
                        })
                    }
                })
            })
        },
        hash(data){
            return JSON.stringify(data).replace('"', '')
        },
        changed(){
            console.debug('saved', this.saved_data);
            console.debug('current', this.hash($wire.data));
            console.debug('changed', this.saved_data !== this.hash($wire.data))
            return this.saved_data !== this.hash($wire.data)
        }
    }))
})
