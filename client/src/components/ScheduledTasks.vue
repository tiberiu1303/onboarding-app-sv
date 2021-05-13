<template>
    <b-container class="mt-5">
        <b-row>
            <div id="tasks-container">
                <div v-for="task, day in tasks" :key="day" class="task-item mr-2 p-3 w-25 rounded shadow text-center" :id="getTaskContainerBackground()">
                    <b-row class="mb-5">
                        <b-col class="task-day">
                            <h3>
                                {{ tasks[day][0].period.name }}
                            </h3>
                        </b-col>    
                    </b-row>
                    <b-carousel
                        slide
                        indicators
                        :interval="0"
                    >
                        <b-carousel-slide v-for="t in task" :key="t._id" img-blank class="task-item">
                            <b-row>
                                <b-col class="task-title mb-5">
                                    <b-img :src="t.image" fluid  alt="Logo Cognizant Softvision"></b-img>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="task-title mb-3">
                                    <h5>
                                        {{ t.title }}
                                    </h5>
                                </b-col>
                            </b-row>
                            <hr/>
                            <b-row class="task-description text-wrap">
                                <b-col>
                                    <p>
                                        {{ t.description.substring(0,50)+"..." }}
                                    </p>
                                </b-col>
                            </b-row>
                        </b-carousel-slide>
                    </b-carousel>
                    <b-row>
                        <b-col>
                            <span>
                                <b-button variant="success" block class="shadow-sm">
                                    Checked
                                    <i class="fas fa-check-double"></i>
                                </b-button>
                            </span>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </b-row>
    </b-container>
</template>
<script>
let backgrounds = []

export default {
    name: "ScheduledTasks",
    data() {
        return {
            tasks: []
        }
    },
    computed: {

    },
    methods: {
        async getTasks() {
            this.tasks = await this.$store.dispatch('getTasks')

            if (this.tasks) {
                this.$emit('uncompletedTasks', this.calcUncompletedTasks())
            }
        },
        getTaskContainerBackground() {
            if (!backgrounds.length) {
                backgrounds = ['pink-bkg', 'cyan-bkg', 'orange-bkg', 'blue-bkg']
            }
            
            const bkg = backgrounds.pop()

            return bkg
        },
        calcUncompletedTasks() {
            let uncompletedTasks = 0
            Object.keys(this.tasks).forEach(k => {
                for (const v of this.tasks[k]) {
                    if (v.status == "2") uncompletedTasks++
                }
            })

            return uncompletedTasks
        }
    },
    mounted() {
        this.getTasks()
    },
}
</script>
<style> 
    #tasks-container {
        flex-direction: row;
        display: flex;
        justify-content: center;
        position: relative;
        color: #fff;
        align-items: stretch;
    }

    hr {
        background: white;
        width: 50px;
    }

    #cyan-bkg {
        background: #25a499;
    }
    #orange-bkg {
        background: #ff9f00;
    }
    #pink-bkg {
        background: #fe1743;
    }
    #blue-bkg {
        background: #4286f5;
    }
    .carousel-caption {
        left: 0 !important;

        position: relative !important;
    }

    .carousel-item>img:nth-child(1) {
        height: 0;
    }

    .task-title {
        min-height: 5rem;
        display: inline-table;
    }
</style>
