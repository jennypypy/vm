<template>
    <transition :name="transition || (fx ? 'vmui-fx-' + (position || 'center') : '')">
        <div :class="className" v-show="visibility" @click="$emit('click')">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    import {Event} from '../../helper';

    export default{
        name: 'overlay',

        props: {
            fx: {
                type: Boolean,
                default: true
            },

            visible: {
                type: Boolean,
                default: false
            },

            position: {
                type: String,
                default: null
            },

            transition: {
                type: String,
                default: null
            }
        },

        data(){
            return {
                visibility: false,
                destroyed: false
            }
        },

        watch: {
            visible(v){
                v ? this.open() : this.close();
            }
        },

        computed: {
            className(){
                var c = ['vmui-overlay'];

                if(this.position){
                    c.push('vmui-overlay-' + this.position);
                }

                c.push(this.class || '');

                return c;
            }
        },

        mounted: function(){
            this.visible && this.open();
        },

        methods: {
            open(){
                if(this.visibility) return false;

                this.visibility = true;
                this.$nextTick(function(){
                    this.$emit('open');
                });
            },

            close(){
                if(!this.visibility) return false;

                this.visibility = false;
                this.$nextTick(function(){
                    this.$emit('close');
                });
            },

            destroy(fx = this.fx){
                if(this.destroyed) return;

                this.close();

                if(fx){
                    Event.on(this.$el, 'transitionend webkitTransitionEnd', () => {
                        this._destroy();
                    })
                }else{
                    this._destroy();
                }
            },

            _destroy(){
                this.$el.parentNode.removeChild(this.$el);
                this.$emit('destroy');
                this.destroyed = true;
            }
        }
    }
</script>

<style>
    .vmui-overlay{
        position: fixed;
        z-index: 10000;
        background: #fff;
        overflow: hidden;
    }

    .vmui-overlay-center{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .vmui-overlay-left, .vmui-overlay-top{
        left: 0px;
        top: 0px;
    }

    .vmui-overlay-left, .vmui-overlay-right{
        height: 100%;
    }

    .vmui-overlay-top, .vmui-overlay-bottom{
        width: 100%;
    }

    .vmui-overlay-bottom{
        bottom: 0px;
        left: 0px;
    }

    .vmui-overlay-right{
        right: 0px;
        top: 0px;
    }

    .vmui-fx-enter-active, .vmui-fx-leave-active,
    .vmui-fx-center-enter-active, .vmui-fx-center-leave-active,
    .vmui-fx-left-enter-active, .vmui-fx-left-leave-active,
    .vmui-fx-right-enter-active, .vmui-fx-right-leave-active,
    .vmui-fx-bottom-enter-active, .vmui-fx-bottom-leave-active,
    .vmui-fx-top-enter-active, .vmui-fx-top-leave-active
    {
        transition: transform .3s ease, opacity .3s ease;
    }

    .vmui-fx-enter, .vmui-fx-leave-active,
    .vmui-fx-center-enter, .vmui-fx-center-leave-active
    {
        opacity: 0;
    }

    .vmui-fx-left-enter, .vmui-fx-left-leave-active
    {
        transform: translateX(-100%);
    }

    .vmui-fx-right-enter, .vmui-fx-right-leave-active
    {
        transform: translateX(100%);
    }

    .vmui-fx-bottom-enter, .vmui-fx-bottom-leave-active
    {
        transform: translateY(100%);
    }

    .vmui-fx-top-enter, .vmui-fx-top-leave-active
    {
        transform: translateY(-100%);
    }
</style>